/*Define the hosting site*/
var repo_site = "https://kimjh21.github.io/lexicaldecisiontask/";

/* Creating timeline*/    
var timeline = [];

/*Preload images*/
var preload = {
    type: 'preload',
    images: [repo_site + 'img/blue.png', repo_site + 'img/orange.png']
}
timeline.push(preload);

/*Define Welcome message trial*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};

timeline.push(welcome);

/*Instructions*/
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>In this experiment, a circle will appear in the center " +
        "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
        "press the letter F on the keyboard as fast as you can.</p>" +
        "<p>If the circle is <strong>orange</strong>, press the letter J " +
        "as fast as you can.</p>" +
        "<div style='width: 700px;'>" +
        "<div style='float: left;'><img src='" + repo_site + "img/blue.png'></img>" + // Change 2: Adding `repo_site` in `instructions`
        "<p class='small'><strong>Press the F key</strong></p></div>" +
        "<div class='float: right;'><img src='" + repo_site + "img/orange.png'></img>" + // Change 2: Adding `repo_site` in `instructions`
        "<p class='small'><strong>Press the J key</strong></p></div>" +
        "</div>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 1500
};

timeline.push(instructions);

/*Test trials*/
var test_stimuli = [
    {stimulus: repo_site + "img/blue.png", correct_response: 'f'},
    {stimulus: repo_site + "img/orange.png", correct_response: 'j'}
];

/*Show a fixation cross*/
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style = "font-size: 60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
    data: {
        task: 'fixation'
    }
}

/*Setting up another trial. Substitute the value from the timeline variables*/
var test = {
    type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
    },
    on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
}

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 5 /*2 trials x 5 times*/
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
