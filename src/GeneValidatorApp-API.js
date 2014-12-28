// GeneValidatorApp-API
//
// This function simply runs a POST request at the provided GeneValidatorApp URL.
// You are required to provide the function the following variables:
//
// * Compulsory Variables 
// *** genevalidatorAppUrl = This the url link to the GeneValidatorApp
//      (e.g. 'genevalidator.sbcs.qmul.ac.uk')
// *** sequence = This is the sequence(s) that are to be analysed by GeneValidator.
//      Sequences should be in a single line with no new line characters within the
//      sequence ('\n'). If an sequence id is present, the id should start with a 
//      forward arrow character ('>') and there must be a new line character between
//      the id and sequence. Muliple Sequences are allowed - there should a new line
//      character between sequences ('\n').
// *** database = This is the name of the chosen database that you wish GeneValidator
//      to use. Possible options can be seen under 'Advanced Parameters' on the GeneValidatorApp.
//
// * Optional Variables
// *** validations (default = all validations) = This is an string of all the validations that
//      you want to run. Each validation must be separated by a comma. Options include: 
//      "length_cluster, length_rank, duplication, gene_merge, multiple_alignment,
//      blast_reading_frame, open_reading_frame"
function sendToGeneValidator(genevalidatorAppUrl, sequence, database, validations) {
  'use strict';
  var seq  = sequence.replace('\n', '%0D%0A').replace('>', '%3E');
  var vals = sort_out_validations(validations);
  var db   = database;
  var data = 'seq=' + seq + '&' + vals + 'database=' + db + '&result_link=yes';
  var link = '';
  $.ajax({
    type: 'POST',
    url: genevalidatorAppUrl,
    data: data,
    async: false,
    success: function(result){
      link = result;
    }
  });
  return link;
}

// This is an internal method that converts returns the validations variable in the required format.
function sort_out_validations(validations){
  'use strict';
  var vals = '';
  if (validations === 'all'){
    vals = 'validations%5B%5D=lenc&validations%5B%5D=lenr&validations%5B%5D=dup&validations%5B%5D=merge&validations%5B%5D=align&validations%5B%5D=frame&validations%5B%5D=orf&';
  } else {
    validations = validations.split(',');
    var validations_short_names = {
      'length_cluster': 'lenc',
      'length_rank': 'lenr',
      'duplication': 'dup',
      'gene_merge': 'merge',
      'multiple_alignment': 'align',
      'blast_reading_frame': 'frame',
      'open_reading_frame': 'orf'
    };
    vals = '';
    for (var i = 0; i<validations.length; i++){
      vals += 'validations%5B%5D=' + validations_short_names[validations[i].trim()] + '&';
    }
  }
  return vals;
}
