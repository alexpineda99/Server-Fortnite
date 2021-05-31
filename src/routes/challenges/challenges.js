const axios = require("axios");

module.exports = { challenges(req, res) {
        const url = "https://api.fortnitetracker.com/v1/challenges"
        const options = {headers: {
            "TRN-Api-Key": "3e0497e5-98f3-49a6-b66c-e4c0d50fbfe8"
        }}
        axios.get(url, options)
        .then(response => {
        //   console.log(response)
          res.send({
              success: true,
              data: response.data
          }) // <= send data to the client
        })
        .catch(err => {
          console.log(err)
          res.send({ err }) // <= send error
        })
    }
  }