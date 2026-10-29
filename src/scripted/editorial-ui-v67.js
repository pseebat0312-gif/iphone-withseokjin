(()=>{
 installEditorial67(LONG_CHAPTERS,EDITORIAL_V67);
 const previous=scenePageLines;
 scenePageLines=function(key,index,choices={}){return editorialLines67(LONG_CHAPTERS,SCENE_CHOICE_ECHO,key,index,choices,previous)};
 if(campaign){migrateEditorial67(campaign,EDITORIAL_V67);scriptSave();}
})();
