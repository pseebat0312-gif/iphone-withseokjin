// Transcribed only from the five lyric screenshots supplied by the user.
// Screenshot overlaps are merged; the song's actual repeated chorus is retained.
// v78: actual supplied audio recognized with Whisper-small (Korean), all 218 lyric characters matched.
// First-word silence spans are bounded at 1.4s; see dialogue/piano-alignment-v78.json.
export const PIANO_LYRICS75=[
 [0.0,'흰 눈이 내리던 날','白雪飘落的那天',4.26],
 [6.72,'너의 곁을 떠난 날','离开你身旁的那天',11.12],
 [13.38,'하루에도 수백 번씩','那句每天写下无数次的话',17.56],
 [19.72,'매일 끄적인 그 말','一日百遍地念着',23.62],
 [24.48,'너무 그리워','真的好想你',30.32],
 [31.48,'나를 안아줘','请你拥抱我',36.96],
 [41.26,'아름다운 기억에 잠겨','愿你沉浸在美好的记忆里',44.68],
 [45.0,'오늘도 웃으며 잠들길','今天也能笑着入睡',51.36],
 [53.1,'따뜻한 봄바람 불 때쯤','温暖的春风吹起时',57.7],
 [57.7,'너에게 너에게 갈게','我会去找你 去找你',62.54],
 [64.4,'약속해 너에게 갈게','我答应你 去找你',69.06],
 [72.1,'추억도 그리움도','我的画中',74.9],
 [78.48,'담긴 나의 그림','装满回忆与思念',81.4],
 [84.92,'지나간 시간 속에','那流逝的时光中',88.82],
 [91.14,'남은 단 하나의 색','你是我唯一…残留的色彩',94.42],
 [96.28,'캄캄한 길 위에','漆黑的路上',100.62],
 [102.04,'한 줄기 빛 그대여','你是一缕光',108.28],
 [112.64,'아름다운 기억에 잠겨','愿你沉浸在美好的记忆里',116.0],
 [116.44,'오늘도 웃으며 잠들길','今天也能笑着入睡',122.38],
 [124.74,'따뜻한 봄바람 불 때쯤','温暖的春风吹起时',129.12],
 [129.12,'너에게 너에게 갈게','我会去找你 去找你',133.9],
 [135.86,'약속해 너에게 갈게','我答应你 去找你',140.5],
 [143.94,'그리움에 잠시 떠나있어도','哪怕因思念而暂别',148.22],
 [149.36,'약속해 I will come to you','我答应你 我会去找你',154.52],
 [154.52,'If you need me, I will come to you','若你需要我 我会走向你',160.92]
].map(([at,ko,zh,end])=>({at,ko,zh,end,text:ko+'\n'+zh}));
export const PIANO_PHOTOS75=['/assets/story/piano-live-v75-1.jpg','/assets/story/piano-live-v75-2.jpg','/assets/story/piano-live-v75-3.jpg'];
export function pianoPhotoIndex75(time,duration,count){return Math.min(count-1,Math.max(0,Math.floor(time*count/duration)))}
