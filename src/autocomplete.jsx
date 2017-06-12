/*
 * @description Will render an html input with autocomplete to remote api src
 * @author Marc Rice 
 * @class Autocomplete configured to load from an external json api with structure: [{key: mykey, value: myvalue}]
 * key is visible to the user and value is the selected value
 * @param String src remote url to target
 * @param Integer minLength 
 * @return HTML autocompleteinput
 */


var React = require('react');

class Autocomplete extends React.Component {

	constructor(props) {
		
		super(props);
		
		//set a minimum length or defaults to 0
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
							console.log('connection failed');
					};
					
					request.send();
				} else {
					 var resultsContainer = document.getElementsByClassName('autocomplete-results')[0];
					 resultsContainer.innerHTML = '';
				}
				
	}
	
	/*
	* Submit function in JS by default loads the t */
	handleSubmit(e) {
		e.preventDefault();
		
		//this.props.submitFunction;
		//alert('asdas');
		
	}


  render() {


			let submitBtnEl = null;
			let WrapTag = 'div';
			let Action = null;
			let Method = null;
	
			//display optional submit button + form, if submitBtn is part of props
			if (this.props.submitBtn) {
				
				submitBtnEl = <input type="submit" className="autocomplete-submit" value={this.props.submitBtn} />;
				WrapTag = 'form';
				Action = this.props.action;
				Method = this.props.method;

			}
			
  		return (<WrapTag className={"autocomplete-"+WrapTag} action={Action} method={Method}>
				<div className="autocomplete-box">
					<input name="q" type="text" onChange={ this.handleChange.bind(this) } className="autocomplete"  autoComplete="off"/>
					<div className="autocomplete-results"/>
				</div>
				{submitBtnEl}
			</WrapTag>); 
  		
  }
    
}


module.exports = Autocomplete;