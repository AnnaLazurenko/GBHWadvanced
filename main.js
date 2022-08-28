const text = `
One: 'Hi Mary.'
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'
`;

const text1 = text.replace(/\n/g, '<br>');

document.querySelector('.replaced-quotes').insertAdjacentHTML('beforeend', 
    `<p>${text1.replace(/(\B')|('\B)/g, '"')}</p>`
)

class Validator {
    constructor(form) {
        this.rules = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error';
        this.form = form;
        this.valid = false;
        this.validateForm();
    }
    validate(regexp, value){
        regexp.test(value)
    }
    
    validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if([...document.getElementById(this.form).querySelectorAll('.invalid')].length = 0){
           this.valid = true;
        }
    }
    _validate(field){
        if(this.rules[field.name]){
            if(!this.rules[field.name].test(field.value)){
               field.classList.add('invalid');
               this.errorMsg(field);
               this.watchField(field);
            }
        }
    }
    errorMsg(field){
        let error = `<span class="${this.errorClass}">${this.errors[field.name]}</span> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.rules[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}









