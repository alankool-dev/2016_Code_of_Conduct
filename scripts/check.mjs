import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const guides = JSON.parse(await readFile('public/guide.json','utf8'));
assert.deepEqual(guides.map(g=>g.role).sort(),['coach','player']);
for(const guide of guides){assert.equal(guide.behaviours.length,6);assert.ok(guide.review_note);for(const item of guide.behaviours){assert.ok(item.title&&item.description);}}
const config=JSON.parse(await readFile('public/config.json','utf8'));
assert.ok(!config.publishableKey || config.publishableKey.startsWith('sb_publishable_'));
assert.equal(JSON.parse(await readFile('vercel.json','utf8')).outputDirectory,'dist');
console.log('Guide data, public configuration and deployment settings verified.');
