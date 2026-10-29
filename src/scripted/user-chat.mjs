// Exact authored input is kept separately from game logic and music-bound text.
export function applyUserChat(nodes,dailies,review){
 for(const r of review.nodes){const n=nodes[r.node];if(!n)throw Error('Missing reviewed node '+r.node);n.messages=[...r.messages];if(r.labels){if(r.labels.length!==n.choices.length)throw Error('Choice count changed '+r.node);r.labels.forEach((text,i)=>n.choices[i].label=text)}for(const[i,lines]of Object.entries(r.replies||{}))n.choices[Number(i)].reply=[...lines];if(r.occupationMessages)n.occupationMessages=structuredClone(r.occupationMessages);if(r.occupationLabels){n.occupationChoices={};for(const[job,labels]of Object.entries(r.occupationLabels))n.occupationChoices[job]=Object.fromEntries(labels.map((text,i)=>[n.choices[i].id,text]));}}
 for(const r of review.daily){const d=dailies.find(d=>d.id===r.id);if(!d)throw Error('Missing reviewed daily '+r.id);d.lines=[...r.lines];d.choices=structuredClone(r.choices)}
 for(const r of Object.values(review.extras)){for(const n of Object.values(nodes))for(const e of n.events||[]){if(r.event===e.id)e.text=r.text;if(r.items?.[e.id])Object.assign(e,r.items[e.id])}}
}
