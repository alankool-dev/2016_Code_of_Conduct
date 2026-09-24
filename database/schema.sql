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
    "intro": "Bring your best effort, support your teammates and enjoy your football.",
    "review_note": "Plain-language summary of the club’s published player code, prepared for review. The full club policy below takes precedence.",
    "behaviours": [
      {"title":"Respect everyone","description":"Treat teammates, opponents and officials fairly. There is no place for bullying, discrimination, threats or abuse."},
      {"title":"Listen and work together","description":"Co-operate with your coach and teammates. Ask questions respectfully and raise concerns through the right club channels."},
      {"title":"Play fair. Stay in control.","description":"Follow the rules and respect refereeing decisions. Let the team manager raise issues with officials. Walk away from arguments."},
      {"title":"Give your best for the team","description":"Work hard, encourage others and recognise good play on both sides. Be a good sport and shake hands after the match."},
      {"title":"Enjoy the game","description":"Play because you enjoy it. Help others enjoy it too. Winning is only one part of football."},
      {"title":"Represent the club well","description":"Your behaviour matters off the pitch too. Follow club rules, including its alcohol, drugs and anti-doping policies. Breaches are handled by the Executive Committee."}
    ]
  },
  {
    "role": "coach",
    "intro": "Set the example and create a positive place for every player to learn.",
    "review_note": "Proposed coach expectations — awaiting club approval. These suggestions do not replace the club’s safeguarding procedures or existing policies.",
    "behaviours": [
      {"title":"Lead with respect","description":"Model calm, fair behaviour towards players, officials and opponents. Challenge bullying, discrimination and abusive language."},
      {"title":"Put players’ wellbeing first","description":"Listen when a player is worried or uncomfortable. Take concerns seriously and follow the club’s safeguarding and reporting procedures."},
      {"title":"Coach with encouragement","description":"Give clear, constructive feedback. Praise effort and learning. Never shame a player for a mistake or a result."},
      {"title":"Make room for everyone","description":"Adapt activities to players’ ages, abilities and needs. Give everyone meaningful opportunities to participate and develop."},
      {"title":"Be prepared and communicate","description":"Plan safe, enjoyable sessions. Explain expectations clearly, start on time and keep parents or guardians informed through club-approved channels."},
      {"title":"Keep appropriate boundaries","description":"Follow club guidance on supervision, communication, photographs and social media. Refer concerns through the safeguarding process rather than investigating them yourself."}
    ]
  }
]
$guide$::jsonb) as guide(role text, intro text, review_note text, behaviours jsonb);
