# GeneValidatorApp API

This is an API for [GeneValidatorApp](http://github.com/wurmlab/GeneValidatorApp)

##Usage
1) Download GeneValidatorApp-API.min.js (located in the build folder)

2) Add the GeneValidatorApp-API.min.js to your HTML

```html
<script type="text/javascript" src="GeneValidatorApp-API.min.js"></script>
```
3) Run the `sendToGeneValidator()` function.

```javascript
sendToGeneValidator(genevalidatorAppUrl, sequence, database, validations)
```

###Function Variables
The `sendToGeneValidator()` function has three compulsory arguments and two optional argument.

#####genevalidatorAppUrl
This is a variable containing a sting of the URL link to the GeneValidatorApp.

<em>Example:</em> `"genevalidator.sbcs.qmul.ac.uk"`

#####sequence
This is a variable containing the sequence(s) that are to be analysed by GeneValidator. This should be a single string with new line characters between sequences ('\n'). If an sequence id is present, the id should start with a  forward arrow character ('>') and there must be a new line character ('\n') between the id and sequence.

<em>Example:</em> `">seqid1\nTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCAT\n>seqid2\nGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCC"`

#####database
This is a variable containing the name of the database that you wish GeneValidator to use. Possible options can be seen under 'Advanced Parameters' on the GeneValidatorApp.

<em>Example:</em> `"SwissProt"`

#####validations (Optional Argument)
This is a variable that lists all the validations that you want to run. The validation should be provided as a single string, where separate validations are separated by a comma.

<em>Example:</em> `"length_cluster, length_rank, duplication, gene_merge, multiple_alignment, blast_reading_frame, open_reading_frame"`

#####output_type (Optional Argument)

  - `open_link` (default): This opens the GV results in a new tab.
  - `link_url`: This return a link to the GV results.
  - `json_url`: This return a link to the GV results in JSON format.

##Exemplar Usage
It is possible to run the `sendToGeneValidator()` method from a wrapper function as follows

```javascript
function send(){
  var genevalidatorAppUrl = "http://genevalidator.sbcs.qmul.ac.uk";

  var sequence = ">gi|514746961|ref|XM_005019748.1| PREDICTED: Anas platyrhynchos insulin (INS), mRNA\nATGGCTCTCTGGATCCGGTCGCTGCCTCTCCTGGCCCTTCTTGCTCTTTCTGGCCCTGGGATCAGCCACGCAGCTGCCAACCAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGAAAGTCAAGCGAGGCATCGTTGAGCAATGCTGTGAAAACCCGTGCTCCCTCTACCAACTGGAAAACTACTGCAACTAG\n>gi|514746961|ref|XM_005019748.1|dup PREDICTED: Anas platyrhynchos insulin (INS), mRNA - Contains a duplication\nATGGCTCTCTGGATCCGGTCGCTGCCTCTCCTGGCCCTTCTTGCTCTTTCTGGCCCTGGGATCAGCCACGCAGCTGCCAACCAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGACAGCACCTCTGTGGCTCCCACTTGGTTGAGGCTCTCTACCTGGTGTGTGGGGAGCGGGGTTTCTTCTACTCCCCCAAAACACGGCGGGACGTTGAGCAGCCTCTAGTGAACGGTCCCCTGCATGGCGAGGTGGGAGAGCTGCCGTTCCAGCATGAGGAATACCAGAAAGTCAAGCGAGGCATCGTTGAGCAATGCTGTGAAAACCCGTGCTCCCTCTACCAACTGGAAAACTACTGCAACTAG";

  var database = "SwissProt;"

  var validations = "length_cluster, length_rank, duplication, gene_merge, multiple_alignment, blast_reading_frame, open_reading_frame";

  var link = sendToGeneValidator(genevalidatorAppUrl, sequence, database, validations);

  window.open(link, "_blank");

}
```

One could then add this custom wrapper function to the HTML as shown below:

```html
<button type="button" onclick="send()" class="btn btn-primary">Click here to send</button>
```

##Demo

Please see [here](http://wurmlab.github.io/GeneValidatorApp-API/) for a working demo (a copy can be found in the demo folder).
