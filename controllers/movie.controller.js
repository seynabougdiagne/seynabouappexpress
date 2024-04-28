const db = require("../models_shema");
const Film = db.films; 

// Créer et enregistrer un nouveau film
exports.create = (req, res) => {
  
  if (!req.body.nom) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    return;
  }
  
  const film = new Film({
    id: req.body.id,
    nom: req.body.nom,
    synopsis: req.body.synopsis,
  });

  // Enregistrer le film dans la base de données
  film
    .save(film)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la création du film.",
      });
    });
};

// Récupérer tous les films de la base de données
exports.findAll= (req, res) => {
  const nom = req.query.nom;
  let condition = nom
    ? { nom: { $regex: new RegExp(nom), $options: "i" } }
    : {};
  Film.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Supprimer un film avec l'ID spécifié dans la requête
exports.delete = (req, res) => {
  const id = req.params.id;
  Film.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le film avec l'ID ${id}. Le film n'a peut-être pas été trouvé !`,
        });
      } else {
        res.send({
          message: "Le film a été supprimé avec succès !",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Impossible de supprimer le film avec l'ID ${id}.`,
      });
    });
};

// Supprimer tous les films de la base de données
exports.deleteAll = (req, res) => {
  Film.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} films ont été supprimés avec succès !`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la suppression de tous les films.",
      });
    });
};

// Trouver tous les films enregistrés
exports.findAllReleased = (req, res) => {
  Film.find({ sorti: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Trouver un film avec un ID spécifique
exports.findOne = (req, res) => {
  const id = req.params.id;
  Film.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Aucun film trouvé avec l'ID ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Erreur lors de la récupération du film avec l'ID ${id}` });
    });
};

// Mettre à jour un film avec l'ID spécifié dans la requête
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Les données à mettre à jour ne peuvent pas être vides !",
      });
    }
    const id = req.params.id;
    Film.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Impossible de mettre à jour le film avec l'ID ${id}. Le film n'a peut-être pas été trouvé !`,
          });
        } else res.send({ message: "Le film a été mis à jour avec succès." });
      })
      .catch(err => {
        res.status(500).send({
          message: `Erreur lors de la mise à jour du film avec l'ID ${id}`,
        });
      });
  };
  
