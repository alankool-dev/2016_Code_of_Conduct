import test from 'node:test';
import assert from 'node:assert/strict';
import {buildInfo} from './build-info.mjs';
test('uses the deployed commit and club-local build date across midnight',()=>{
  const sha='abcdef1234567890abcdef1234567890abcdef12';
  const info=buildInfo({VERCEL:'1',VERCEL_GIT_COMMIT_SHA:sha},new Date('2026-09-24T23:30:00Z'));
  assert.equal(info.label,'Build 2026.09.25 · Git abcdef1');
  assert.equal(info.commit,sha);
});
test('does not invent a Git reference for a local preview',()=>{
  assert.equal(buildInfo({},new Date('2026-01-02T10:00:00Z')).label,'Build 2026.01.02 · Local preview');
});
test('rejects missing production metadata and malformed references',()=>{
  assert.throws(()=>buildInfo({VERCEL:'1'}));
  assert.throws(()=>buildInfo({VERCEL_GIT_COMMIT_SHA:'<script>'}));
});
