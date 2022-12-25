const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };
// const genres= (value,helpers) =>{
//   const valueArray = value.split(",");
//   const genresArray = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];
//   console.log("value Array",valueArray);
//   // valueArray.forEach(element => {
//   //   console.log("element",element);
//   //   if(genresArray.indexOf(element) < 0){
//   //     console.log("inside error geners");
//   //     return helpers.message('"{{#label}}"must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
//   //   }
//   // });
//   return helpers.message("hey buddy");
//   console.log("something..",value);
//   return value;
//   }
  const genres = (value, helpers) => {
    let validGenres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];
    let reqGenres = value.split(",");
    for (let i = 0; i < reqGenres.length; i++) {
        if (!validGenres.includes(reqGenres[i])) {
            return helpers.message('{{#label}}" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
        }
    }
    return value;
}
  const contentRating= (value,helpers) =>{
    const contentRatingArray = ["Anyone", "7+", "12+", "16+", "18+"];
    const valueArray = value.split(",");
    console.log(valueArray);
    for (let i = 0; i < valueArray.length; i++) {
      if (!contentRatingArray.includes(valueArray[i])) {
          return helpers.message('{{#label}}" must be one of ["Anyone", "7+", "12+", "16+", "18+"]');
      }
  }
    return value;
  }
  module.exports = {
    objectId,
    contentRating,
    genres
};