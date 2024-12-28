const DEFAULT_PAPER = "";
window.questions = [firestoreObj];
window.questions.forEach(function(question, i){
	if(DEFAULT_PAPER != ""){
		if(!question.papers) question.papers = [];
		question.papers.push({
			paper: DEFAULT_PAPER,
			number: i
		})
	}
});

