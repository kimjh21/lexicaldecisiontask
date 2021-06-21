/* Creating timeline*/    
var timeline = [];

/*Define Welcome message trial*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "<p>Welcome. Thank you for taking part in this study.</p>"+
    "<p>This study examines how lay people perceive a word or non-word.<p>"+
    "<p>Press any key to begin.<p>"
}

timeline.push(welcome);

/*Instructions*/
var instructions = {
  type: 'html-button-response',
  stimulus: '<p>Each screen will show either an English word or letters that do not form a word.</p>'+
    '<p>Press <strong>F</strong> on the keyboard as fast as you can if the letters form a valid word.</p><p>Press <strong>J</strong> on the keyboard as fast as you can if the letters do not form a valid word.</p>',
  choices: ['Ready to start'],
  post_trial_gap: 500
}

timeline.push(instructions);

/*Test trials*/
var test_stimuli = [
    {word: 'big', correct_response: 'f', word_category: 'large'},
    {word: 'many', correct_response: 'f', word_category: 'large'},
    {word: 'long', correct_response: 'f', word_category: 'large'},
    {word: 'large', correct_response: 'f', word_category: 'large'},
    {word: 'massive', correct_response: 'f', word_category: 'large'},
    {word: 'high', correct_response: 'f', word_category: 'large'},
    {word: 'bulky', correct_response: 'f', word_category: 'large'},
    {word: 'few', correct_response: 'f', word_category: 'small'},
    {word: 'little', correct_response: 'f', word_category: 'small'},
    {word: 'short', correct_response: 'f', word_category: 'small'},
    {word: 'small', correct_response: 'f', word_category: 'small'},
    {word: 'tiny', correct_response: 'f', word_category: 'small'},
    {word: 'slim', correct_response: 'f', word_category: 'small'},
    {word: 'low', correct_response: 'f', word_category: 'small'},
    {word: 'cartoon', correct_response: 'f', word_category: 'neutral'},
    {word: 'picture', correct_response: 'f', word_category: 'neutral'},
    {word: 'flower', correct_response: 'f', word_category: 'neutral'},
    {word: 'computer', correct_response: 'f', word_category: 'neutral'},
    {word: 'binder', correct_response: 'f', word_category: 'neutral'},
    {word: 'glue', correct_response: 'f', word_category: 'neutral'},
    {word: 'note', correct_response: 'f', word_category: 'neutral'},
    {word: 'npght', correct_response: 'j', word_category: 'nonword'},
    {word: 'hankk', correct_response: 'j', word_category: 'nonword'},
    {word: 'pecjn', correct_response: 'j', word_category: 'nonword'},
    {word: 'ctrnso', correct_response: 'j', word_category: 'nonword'},
    {word: 'ltple', correct_response: 'j', word_category: 'nonword'},
    {word: 'bxu', correct_response: 'j', word_category: 'nonword'},
    {word: 'gabls', correct_response: 'j', word_category: 'nonword'}
];

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style = "font-size: 35px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
    data: {
        task: 'fixation'
    }
}

var test = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('word'),
    choices: ['f', 'j'],
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response'),
        word_category: jsPsych.timelineVariable('word_category')
    },
    on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
}

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 1 /*1 trials x 5 times*/
}

timeline.push(test_procedure);

/*Debrief*/
var debrief_block = {
type: "html-keyboard-response",
stimulus: function() {

  var trials = jsPsych.data.get().filter({task: 'response'});
  var correct_trials = trials.filter({correct: true});
  var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
  var rt = Math.round(correct_trials.select('rt').mean());

  return `<p>You responded correctly on ${accuracy}% of the trials.</p>
    <p>Your average response time was ${rt}ms.</p>
    <p>Press any key to complete the experiment. Thank you!</p>`;

}
};

timeline.push(debrief_block);
