module.exports = mongoose => {
    const filmSchema = mongoose.Schema({
      id: Number, 
      nom: String,
      synopsis: String,

    });
  
    filmSchema.method("toJSON", function () {
      const { __v, _id, ...objet } = this.toObject();
      objet.filmId = _id;
      return objet;
    });
  
    const Film = mongoose.model("film", filmSchema); 
    return Film;
  };
  