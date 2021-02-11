const { log } = require('debug');
var express = require('express');
var router = express.Router();
var connection = require('../connection/connection')
var query = require('../connection/query');
var config = require('../../config');
var store = require('store');

router.post('/get_arts', async (req, res, next) => {

  const { id } = req.body;
  let sql = "";

  const conn = await connection(config).catch(e => { });

  sql = `SELECT * FROM wi_canvas WHERE id = ?`;
  const info = await query(conn, sql, [id])

  sql = `SELECT * FROM wi_design WHERE id = ?`;
  const size = await query(conn, sql, [info[0].design_id])

  canvas = {
    'id': "canvas-" + info[0].id,
    'x': "0",
    'y': "0",
    'width': parseFloat(size[0].d_width + 0.15).toFixed(2),
    'height': parseFloat(size[0].d_height + 0.15).toFixed(2)
  }

  sql = `SELECT * FROM wi_art WHERE canvas_id = ?`;
  const dts = await query(conn, sql, [id])
  var arts = {};
  dts.forEach(art => {
    var has_media = false;
    var art_id = "art_" + art.id;
    var content = "";
    if (art.type == 'image-tool') {
      if (art.media_id) {

      }
    } else {
      content = art.content;
    }

    if (typeof content !== 'undefined') {
      var text_style = (
        art.text_style == "" ?
          [{ 'bold': false, 'italic': false }] :
          JSON.parse(art.text_style)
      )

      arts[art_id] = {
        'id': art_id,
        'type': art.type,
        'content': content,
        'x': art.x,
        'y': art.y,
        'width': art.width,
        'height': art.height,
        'can_edit': art.can_edit,
        'edit_json': art.edit_json,
        'rotate': art.rotate,
        'text_style': text_style,
        // 'media_id': (has_media ? art.media_id : 0),
      };
    }

  });

  res.json({
    status: 200,
    message: "Successful",
    result: { canvas: canvas, arts: arts },
  })
});

router.get('/get_test', function (req, res, next) {
  console.log("Tests");


});

module.exports = router;