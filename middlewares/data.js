const needle = require('needle');

const { DATA_ANALYSIS_API } = process.env;

module.exports = function (options) {
    return async function (req, res, next) {
        const { form, answer } = res.locals;
        const formData = JSON.parse(form.data);
        const questions = formData.pages[0].elements;

        if (!questions) return res.status(200).send('Submitted successfully');

        // filter text questions
        const textQuestions = questions.filter(question => question.type === 'text' || question.type === 'comment');
        if (textQuestions.length > 0) {
            // send answers to data analysis api
            const answers = textQuestions.map(question => new Object({
                formId: form._id,
                questionId: question.name,
                answer: answer[question.name]
            }));
            try {
                if (!!DATA_ANALYSIS_API) {
                   await needle('post', DATA_ANALYSIS_API, { data: answers }, { json: true });
                }
            } catch {
                console.log('Can\'t send answers to data analysis API');
                res.status(200).send('Submitted successfully');
            }
        }

        res.status(200).send('Submitted successfully');
    };
}