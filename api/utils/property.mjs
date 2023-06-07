const plainGenre =
  "artbook,doujinshi,manhua,western,shoujo,seinen,futa,gore,ecchi,smut,cartoon,imageset,manhwa,_4_koma,adventure,animals,bodyswap,childhood_friends,contest_winning,crossdressing,demons,emperor_daughte,fetish,gender_bender,gyaru,historical,isekai,magic,mecha,monster_girls,mystery,office_workers,parody,post_apocalyptic,reincarnation,reverse_isekai,royalty,sci_fi,shounen_ai,sm_bdsm,super_power,survival,tower_climbing,transmigration,video_games,xianxia,xuanhuan,virtual_reality,traditional_games,thriller,superhero,vampires,space,showbiz,shota,samurai,romance,reverse_harem,psychological,philosophical,omegaverse,netorare,monsters,medical,magical_girls,kids,horror,harem,genderswap,full_color,fantasy,drama,delinquents,cooking,college_life,cars,anthology,age_gap,action,hentai,adult,bloody,bara,yuri,shounen,comic,manga,webtoon,josei,yaoi,violence,mature,adaptation,aliens,beasts,cheating_infidelity,comedy,crime,dementia,college_life ,dungeons,fan_colored,game,ghosts,harlequin,incest,loli,martial_arts,military,music,ninja,oneshot,police,regression,revenge,royal_family,shoujo_ai,school_life,slice_of_life,sports,supernatural,time_travel,tragedy,villainess,wuxia,yakuzas";

const language = ["ar", "zh", "en", "fr", "de", "id", "ja", "ko", "ru"];
export const comicProps = {
  domain: "https://battwo.com",
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
  status: ["completed", "pending", "ongoing", "hiatus", "cancelled"],
  originaLanguage: language,
  translatedLanguage: language,
};
