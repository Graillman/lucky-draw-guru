import { describe, it, expect } from 'vitest';
import {
  createCertificate,
  verifyCertificate,
  encodeCertificate,
  decodeCertificate,
  buildVerifyUrl,
  generateNonce,
} from './fairnessCertificate';

const participants = [
  { pseudo: 'Alice', weight: 1 },
  { pseudo: 'Bob', weight: 1 },
  { pseudo: 'Charlie', weight: 3 },
];

describe('fairnessCertificate', () => {
  it('creates a certificate that verifies as valid', async () => {
    const cert = await createCertificate({ participants, winner: 'Bob' });
    expect(cert.v).toBe('fc-v2');
    expect(cert.winner).toBe('Bob');
    expect(cert.hash).toMatch(/^[0-9a-f]{64}$/);
    const res = await verifyCertificate(cert);
    expect(res.valid).toBe(true);
    expect(res.hashMatches).toBe(true);
  });

  it('detects a tampered winner', async () => {
    const cert = await createCertificate({ participants, winner: 'Bob' });
    const res = await verifyCertificate({ ...cert, winner: 'Charlie' });
    expect(res.valid).toBe(false);
  });

  it('detects tampered participants', async () => {
    const cert = await createCertificate({ participants, winner: 'Bob' });
    const res = await verifyCertificate({
      ...cert,
      participants: [...participants, { pseudo: 'Mallory', weight: 99 }],
    });
    expect(res.valid).toBe(false);
  });

  it('detects participant reordering (order is part of the record)', async () => {
    const cert = await createCertificate({ participants, winner: 'Bob' });
    const res = await verifyCertificate({
      ...cert,
      participants: [...participants].reverse(),
    });
    expect(res.valid).toBe(false);
  });

  it('detects a tampered hash', async () => {
    const cert = await createCertificate({ participants, winner: 'Bob' });
    const res = await verifyCertificate({ ...cert, hash: '0'.repeat(64) });
    expect(res.valid).toBe(false);
  });

  it('survives an encode/decode roundtrip and stays valid', async () => {
    const cert = await createCertificate({ participants, winner: 'Charlie' });
    const decoded = decodeCertificate(encodeCertificate(cert));
    expect(decoded.hash).toBe(cert.hash);
    expect(decoded.winner).toBe(cert.winner);
    expect(decoded.nonce).toBe(cert.nonce);
    expect((await verifyCertificate(decoded)).valid).toBe(true);
  });

  it('builds a verify URL pointing at /verify with the certificate', async () => {
    const cert = await createCertificate({ participants, winner: 'Alice' });
    const url = buildVerifyUrl(cert, 'https://realwheelpicker.com');
    expect(url).toContain('/verify?c=');
  });

  it('gives identical draws distinct nonces and hashes', async () => {
    const a = await createCertificate({ participants, winner: 'Bob' });
    const b = await createCertificate({ participants, winner: 'Bob' });
    expect(a.nonce).not.toBe(b.nonce);
    expect(a.hash).not.toBe(b.hash);
  });

  it('generateNonce returns distinct lowercase hex strings', () => {
    expect(generateNonce()).not.toBe(generateNonce());
    expect(generateNonce()).toMatch(/^[0-9a-f]+$/);
  });
});
