class PromptHelper {
    static getInquirierPrompt(type, message, name, choices=null) {
        let prompt = {
            type: type,
            message: message,
            name: name,
        };
    
        if (Array.isArray(choices)) {
            prompt.choices = choices;
        }
    
        return prompt;
    }

    static getAll() {
        let prompts = [];

        prompts.push(PromptHelper.getInquirierPrompt('input', 'What is the name of the module?', 'moduleName'));
        prompts.push(PromptHelper.getInquirierPrompt('input', 'What is the author\'s name?', 'authorName'));
        prompts.push(PromptHelper.getInquirierPrompt('list', 'What language will you be coding in', 'language', ['javascript', 'lua', 'C#']));
        prompts.push(PromptHelper.getInquirierPrompt('checkbox', 'What type of scripts will you need', 'scriptTypes', ['client', 'server']));
        prompts.push(PromptHelper.getInquirierPrompt('checkbox', 'What additional files will you need created?', 'fileChoice', ['html', 'css', 'script']));

        return prompts;
    }
}

module.exports = PromptHelper;