const language =
  "ab,aa,af,ak,sq,am,ar,an,hy,as,av,ae,ay,az,bm,ba,eu,be,bn,bh,bi,bs,br,bg,my,ca,ch,ce,ny,zh,cv,kw,co,cr,hr,cs,da,dv,nl,en,eo,et,ee,fo,fj,fi,fr,ff,gl,ka,de,el,gn,gu,ht,ha,he,hz,hi,ho,hu,ia,id,ie,ga,ig,ik,io,is,it,iu,ja,jv,kl,kn,kr,ks,kk,km,ki,rw,ky,kv,kg,ko,ku,kj,la,lb,lg,li,ln,lo,lt,lu,lv,gv,mk,mg,ms,ml,mt,mi,mr,mh,mn,na,nv,nb,nd,ne,ng,nn,no,ii,nr,oc,oj,cu,om,or,os,pa,pi,fa,pl,ps,pt,qu,rm,rn,ro,ru,sa,sc,sd,se,sm,sg,sr,gd,sn,si,sk,sl,so,st,es,su,sw,ss,sv,ta,te,tg,th,ti,bo,tk,tl,tn,to,tr,ts,tt,tw,ty,ug,uk,ur,uz,ve,vi,vo,wa,cy,wo,fy,xh,yi,yo,za";

const plainGenre =
  "artbook,doujinshi,manhua,western,shoujo,seinen,futa,gore,ecchi,smut,cartoon,imageset,manhwa,_4_koma,adventure,animals,bodyswap,childhood_friends,contest_winning,crossdressing,demons,emperor_daughte,fetish,gender_bender,gyaru,historical,isekai,magic,mecha,monster_girls,mystery,office_workers,parody,post_apocalyptic,reincarnation,reverse_isekai,royalty,sci_fi,shounen_ai,sm_bdsm,super_power,survival,tower_climbing,transmigration,video_games,xianxia,xuanhuan,virtual_reality,traditional_games,thriller,superhero,vampires,space,showbiz,shota,samurai,romance,reverse_harem,psychological,philosophical,omegaverse,netorare,monsters,medical,magical_girls,kids,horror,harem,genderswap,full_color,fantasy,drama,delinquents,cooking,college_life,cars,anthology,age_gap,action,hentai,adult,bloody,bara,yuri,shounen,comic,manga,webtoon,josei,yaoi,violence,mature,adaptation,aliens,beasts,cheating_infidelity,comedy,crime,dementia,college_life ,dungeons,fan_colored,game,ghosts,harlequin,incest,loli,martial_arts,military,music,ninja,oneshot,police,regression,revenge,royal_family,shoujo_ai,school_life,slice_of_life,sports,supernatural,time_travel,tragedy,villainess,wuxia,yakuzas";

export const comicProps = {
  order: [
    "field_score",
    "field_follow",
    "field_review",
    "field_comment",
    "field_chapter",
    "field_upload",
    "field_public",
    "field_name",
    "views_d000",
  ],
  genres: plainGenre.split(","),
  status: ["complete", "pending", "ongoing", "hiatus", "cancelled"],
  originaLanguage: language.split(","),
  translatedLanguage: language.split(","),
};

export function isProp(prop, defaultValue, inputValue) {
  const isOrderFilter = comicProps[prop].find((oProp) => oProp === inputValue)
    ? inputValue
    : false;
  return isOrderFilter ? inputValue : defaultValue;
}

export function GenreValidator(genres) {
  const excludeGenres = [];
  const includeGenres = [];
  let hasExcludeGenre = false;

  genres.split(",").forEach((gen) => {
    if (!gen.indexOf("|")) {
      hasExcludeGenre = true;
      gen = gen.replace("|", "");
      gen = isProp("genres", "", gen);
      excludeGenres.push(gen);
    } else {
      gen = isProp("genres", "", gen);
      includeGenres.push(gen);
    }
  });

  let temp = [includeGenres, excludeGenres];
  temp = temp.map((type) => {
    return type.filter((str) => str !== "");
  });

  if (temp[0].length === 0 && temp[1].length === 0) {
    return "";
  }
  if (temp[1].length === 0) {
    return includeGenres.join(",");
  }
  return temp.join("|");
}
