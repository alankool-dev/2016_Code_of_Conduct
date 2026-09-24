export function buildInfo(env = process.env, now = new Date()) {
  const commit = env.VERCEL_GIT_COMMIT_SHA || '';
  if (commit && !/^[a-f0-9]{40}$/i.test(commit)) throw new Error('Invalid Git commit reference');
  if (env.VERCEL === '1' && !commit) throw new Error('Enable Vercel system environment variables to include the deployed Git commit');
  const parts = new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Dublin',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part = type => parts.find(p => p.type === type).value;
  const date = `${part('year')}.${part('month')}.${part('day')}`;
  return {date, commit, label: commit ? `Build ${date} · Git ${commit.slice(0,7)}` : `Build ${date} · Local preview`};
}
