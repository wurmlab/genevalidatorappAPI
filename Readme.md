# GeneValidatorApp API

This is an API for [GeneValidatorApp](http://github.com/IsmailM/GeneValidatorApp)

##Usage
1) Download GeneValidatorApp-API.min.js (located in the build folder)
2) Add the GeneValidatorApp-API.min.js to your HTML

```
<script type="text/javascript" src="GeneValidatorApp-API.min.js"></script>
```
3) Run the `sendToGeneValidator()` function.

```javascript
sendToGeneValidator(geneValidatorAppUrl, sequence, database, validations)
``` 

###Function Variables
####geneValidatorAppUrl
This the url link to the GeneValidatorApp
<em>Example:</em> `"genevalidator.sbcs.qmul.ac.uk"`

####sequence
This is the sequence(s) that are to be analysed by GeneValidator. Sequences should be in a single line with no new line characters within the sequence ('\n'). If an sequence id is present, the id should start with a  forward arrow character ('>') and there must be a new line character between the id and sequence. Muliple Sequences are allowed - there should a new line character between sequences ('\n').
<em>Example:</em> `">seqid1\nTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCAT\n>seqid2\nGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCC"`

####database
This is the name of the chosen database that you wish GeneValidator to use. Possible options can be seen under 'Advanced Parameters' on the GeneValidatorApp.
<em>Example:</em> `"SwissProt"`

####validations (Optional Argument)
This is an string of all the validations that you want to run. Each validation must be separated by a comma.
<em>Example:</em> `"length_cluster, length_rank, duplication, gene_merge, multiple_alignment, blast_reading_frame, open_reading_frame"`


##Examplar Usage
It is possible to run the `sendToGeneValidator()` method from a wrapper function as follows

```javascript
function send(){
  var geneValidatorAppUrl = "http://genevalidator.sbcs.qmul.ac.uk";

  var sequence = ">gi|514746961|ref|XM_005019748.1| PREDICTED: Anas platyrhynchos insulin (INS), mRNA\nATGGCTCTCTGGATCCGGTCGCTGCCTCTCCTGGCCCTTCTTGCTCTTTCTGGCCCTGGGATCAGCCACGCAGCTGCCAACCAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGAAAGTCAAGCGAGGCATCGTTGAGCAATGCTGTGAAAACCCGTGCTCCCTCTACCAACTGGAAAACTACTGCAACTAG\n>gi|514746961|ref|XM_005019748.1|dup PREDICTED: Anas platyrhynchos insulin (INS), mRNA - Contains a duplication\nATGGCTCTCTGGATCCGGTCGCTGCCTCTCCTGGCCCTTCTTGCTCTTTCTGGCCCTGGGATCAGCCACGCAGCTGCCAACCAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGACAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGAAAGTCAAGCGAGGCATCGTTGAGCAATGCTGTGAAAACCCGTGCTCCCTCTACCAACTGGAAAACTACTGCAACTAG";

  var database = "SwissProt;"

  var validations = "length_cluster, length_rank, duplication, gene_merge, multiple_alignment, blast_reading_frame, open_reading_frame";

  var link = sendToGeneValidator(geneValidatorAppUrl, sequence, database, validations);

  window.open(link, "_blank");

}
```

One could then add this custom wrapper function to the HTML as shown below:

```
<button type="button" onclick="send()" class="btn btn-primary">Click here to send</button>
```

##Demo

Please see [here](http://ismailm.github.io/GeneValidatorApp-API/) for a working demo (a copy can be found in the demo folder).
