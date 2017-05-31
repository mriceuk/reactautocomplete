import React from 'react'; 

 /**
 * @description Will render an html input with autocomplete to remote api src
 * @author Marc Rice 
 * @class Autocomplete configured to load from an external json api with structure: [{key: mykey, value: myvalue}]
 * key is visible to the user and value is the selected value
 * @param String src remote url to target
 * @param Integer minLength 
 * @return HTML autocompleteinput
*/

class Autocomplete extends React.Component {


	componentDidMount() {
		
		//avoid crashing servers with a minLength property
		this.optionalMinLength = this.props.minLength || null; 

  }
  
  handleChange( url ) {
				
				var inputText = document.getElementsByClassName('autocomplete')[0].value;
			  
			  if (inputText.length >= this.optionalMinLength) {
				 	var request = new XMLHttpRequest();

					request.open('GET', this.props.src + "?search=" + inputText, true);
					
					
					request.onload = function() {
						
						//if request returns successfully
					  if (request.status >= 200 && request.status < 400 ) {
		
					    var data = JSON.parse(request.responseText);
					    var autocompleteInput = document.getElementsByClassName('autocomplete')[0];
					    var resultsContainer = document.getElementsByClassName('autocomplete-results')[0];
					    
					    resultsContainer.innerHTML = '';
					    autocompleteInput.setAttribute('selected', '');
					    
							Array.prototype.forEach.call(data, function(el, i) {		
								
								var result = document.createElement('a');
								result.setAttribute('value', el.value);
								result.innerHTML = el.key;
								result.onclick = function() { 
									autocompleteInput.value = el.key;  
									autocompleteInput.selected = el.value;
									resultsContainer.innerHTML = '';
								}
								resultsContainer.appendChild(result);

							});
							
						//TODO: handle failed response
					  } else {
					   
	
					  }
					};
					
					request.onerror = function() {
							//TODO: replace with styled dialog boxes https://github.com/reactjs/react-modal
							console.log('connection failed');
					};
					
					request.send();
				} else {
					 var resultsContainer = document.getElementsByClassName('autocomplete-results')[0];
					 resultsContainer.innerHTML = '';
				}
				
	}

	
  render() {

  		return (<div className="autocomplete-box"><input type="text" onChange={ this.handleChange.bind(this) } className="autocomplete"/><div className="autocomplete-results"/></div>);
  		
  }
  
  
}

export default Autocomplete;