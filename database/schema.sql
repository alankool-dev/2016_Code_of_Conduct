create table public.behaviour_guides (
  role text primary key check (role in ('player', 'coach')),
  intro text not null,
  review_note text not null,
  behaviours jsonb not null check (jsonb_typeof(behaviours) = 'array'),
  is_visible boolean not null default true
);
alter table public.behaviour_guides enable row level security;
revoke all on public.behaviour_guides from anon, authenticated;
grant select on public.behaviour_guides to anon, authenticated;
create policy "Visible guides can be read" on public.behaviour_guides
  for select to anon, authenticated using (is_visible = true);
insert into public.behaviour_guides (role, intro, review_note, behaviours) select role, intro, review_note, behaviours from jsonb_to_recordset($guide$[
  {
    "role": "player",
    "intro": "Try your best, be kind and enjoy playing with your teammates.",
    "review_note": "Ask a parent or guardian to help if anything is unclear. Read this guide alongside the full club policies below.",
    "behaviours": [
      {
        "title": "Be a good teammate",
        "description": "Include everyone. Encourage your teammates, especially after a mistake. No name-calling, bullying or leaving someone out."
      },
      {
        "title": "Listen and ask questions",
        "description": "Listen when your coach is explaining. If you don’t understand, ask. Tell your coach or a trusted adult if you are hurt, worried or need a break."
      },
      {
        "title": "Play fair and stay calm",
        "description": "Follow the rules and respect the referee. Don’t argue, push or hit. If you feel angry, step away and ask your coach for help."
      },
      {
        "title": "Try your best",
        "description": "Keep trying, even when something is difficult. Mistakes help us learn. Celebrate good play by both teams and thank your opponents after the match."
      },
      {
        "title": "Be ready for football",
        "description": "Ask your parent or guardian to help you arrive on time with your kit, shin pads and water. Tell your coach before leaving training or a match."
      },
      {
        "title": "Be kind off the pitch too",
        "description": "Look after the pitch and equipment. Be respectful in team chats. Tell a trusted adult if a message or someone’s behaviour makes you uncomfortable."
      }
    ]
  },
  {
    "role": "coach",
    "intro": "Help every schoolboy player feel safe, included and confident to learn.",
    "review_note": "Follow the club’s safeguarding, supervision and reporting procedures. Read this guide alongside the full club policies below.",
    "behaviours": [
      {
        "title": "Put the child before the result",
        "description": "Prioritise enjoyment, wellbeing and development. Never pressure a child to play through pain or distress. Listen when a player needs help or a break."
      },
      {
        "title": "Encourage learning",
        "description": "Use short, age-appropriate instructions and demonstrations. Praise effort, teamwork and improvement. Never ridicule a child, shout abuse or punish mistakes."
      },
      {
        "title": "Include every player",
        "description": "Adapt sessions to different ages, abilities and needs. Give each child meaningful opportunities to participate. Explain selection and playing-time expectations clearly to families."
      },
      {
        "title": "Set the example",
        "description": "Stay calm with referees, opponents and parents. Challenge bullying and discrimination. Show players how to handle disappointment and celebrate fairly."
      },
      {
        "title": "Work with parents and guardians",
        "description": "Share arrangements through club-approved channels. Be clear about arrival, collection and supervision. Follow club procedures if a child has not been collected."
      },
      {
        "title": "Keep children safe",
        "description": "Follow club safeguarding rules for supervision, messages and photographs. Keep appropriate boundaries with children. Record and report concerns through the club’s safeguarding process; do not investigate them yourself."
      }
    ]
  }
]
$guide$::jsonb) as guide(role text, intro text, review_note text, behaviours jsonb);
