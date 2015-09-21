// GeneValidatorApp-API

//define global GV object
var GV;
if (!GV) {
    GV = {};
}

//GV module
(function () {
  'use strict';

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
  GV.sendToGeneValidator = function(genevalidatorAppUrl, sequence, db, validations, result_type) {
    var gvResults = ''
    var data = GV.setUpData(sequence, validations, db, result_type)
    var promise = $.ajax({
      type: 'POST',
      url: genevalidatorAppUrl,
      data: data,
    });
    if ((result_type == 'open_link') || result_type == undefined) {
      var loading_url = genevalidatorAppUrl + '/GeneValidator/loading.html'
      var results_page = window.open(loading_url, '_blank');
      promise.done(function(result) {
        console.log(result);
        results_page.location.href = result;
        gvResults = result
      })
    } else if ( (result_type == 'results_url') || (result_type == 'json_url') ) {
      promise.done(function(result) {
        console.log(result);
        gvResults = result
      })
    }
    return gvResults
  }

  GV.setUpData = function(sequence, validations, db, result_type) {
    var seq  = sequence.replace('\r\n', '%0D%0A').replace('\n', '%0D%0A').replace('>', '%3E');
    var vals = GV.sortOutValidations(validations);
    var output_type = GV.type_of_output(result_type)
    var data = 'seq=' + seq + '&' + vals + 'database=' + db + output_type
    return data
  }

  // This is an internal method that converts returns the validations variable in the required format.
  GV.sortOutValidations = function(validations){
    var vals = '';
    if ((validations === 'all') || (validations === undefined)){
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

  GV.type_of_output = function(result_type) {
    var output_type = ''
    if ((result_type === 'open_link') || (result_type === 'results_url') || result_type === undefined) {
      output_type = '&results_url=yes';
    } else if (result_type === 'json_url') {
      output_type = '&json_url=yes';
    };
    return output_type;
  }
}());
