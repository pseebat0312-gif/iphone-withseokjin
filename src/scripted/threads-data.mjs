// Threads is a personal side app. Story-linked author drafts are imported explicitly.
export const THREADS_DRAFT=[];
export function threadsUnlocked(entry,story){return !entry.node||Boolean(story&&story.started!==false&&(story.delivered?.includes(entry.node)||story.done?.includes(entry.node)))}
