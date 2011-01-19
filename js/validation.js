
ValidateClass = Class.create();

ValidateClass.prototype = {

    initialize: function(element,flag){
        if (element != null){
            this.element = element;
        }
        this.displayType = flag;
    },

    rules: null,

    rule: null,

    labels: null,

    param : null,

    tempFlag : true,

    element : null,

    useToolTips : true,

    messageTmplate: {
        "validNotEmpty": "#{field}は必須項目です。",
        "validDigit": "#{field}は数字で入力して下さい",
        "validMax" : "#{field}は#{parm}文字以下で入力して下さい",
        "validMin" : "#{field}は#[parm]文字以上で入力して下さい",
        "validEq" : "#{field}の文字数が不正です",
        "validMail" : "#{field}の形式が正しくありません",
        "validPhone" : "#{field}の形式が正しくありません",
        "validTwoBite" : "#{field}は日本語で入力して下さい",
        "validPostCode" : "#{field}の入力形式が違います"
    },

    factory: function(rules,label,allCheckFlag) {

        //alert(label + ":" + rules);
        this.rules = rules;
        this.labels = label;
        if (this.rules instanceof Array) {
            if (this.rules.length > 1) {
                for(var i=0; i < this.rules.length; i++) {
                    if (!this.execute(this.rules[i])) {
                        this.tempFlag = false;
                        break;
                    } 
                }
            } else {
                if (!this.execute(this.rules)) {
                    this.tempFlag = false;
                }              
            }
        } else {
            if (!this.execute(this.rules)) {
                this.tempFlag = false;
            }
        }

        // if allchecking validate
        if (allCheckFlag) {
            return this.tempFlag;
        }


        if (!this.useToolTips) {
            if (!this.tempFlag) {
                var message = this.setTemplate(this.labels);
                this.displayMessage(this.element.name,message);
            } else {
                this.displayMessage(this.element.name,"ok");
            }
        } else {
             if (!this.tempFlag) {
                var message = this.setTemplate(this.labels);
                this.element.title = message;

            } else {
                //this.displayMessage(this.element.name,"ok");
                this.element.title = "ok";
            }
        }

        return this.tempFlag;
    },

    execute: function(rule) {
        resRule = this.scanRule(rule);
        if (resRule instanceof Array) {
            this.rule = resRule[0];
            this.param = resRule[1];
        } else {
            this.rule = resRule;
        }
        return this.getMethod(this.element,this.param);

    },

    allCheck: function(options,allowFlags,visableArea,Areas) {
        for(keys in options) {
            var element = ($(keys)) ? $(keys) : null;
            options[keys].each(function(rule){
                validClass = new ValidateClass(element);
                var resRule = validClass.scanRule(rule);
                var param = null;
                 if (resRule instanceof Array) {
                     rule = resRule[0];
                     param = resRule[1];
                 } else {
                     rule = resRule;
                 }
                var result = null;
                var checkFlag = false;
                checkFlag = validClass.areaCheck(keys,visableArea,Areas);
                if (element != null) {
                    if (checkFlag == false) {
                        result = validClass.getMethod(element,rule,param);
                    } else {
                        result = true;
                    }
                }
                if (!result) {
                    allowFlags[keys] = false;
                    return;
                } else {
                    allowFlags[keys] = true;
                }
                //alert(keys + ':' + allowFlags[keys]);
            });
        }
        return allowFlags;
    },

    areaCheck: function(field,visibleArea,Areas) {

        flag = null;
        visibleArea.each(function(val){
            if (Areas[val].indexOf(field) != -1) {
                flag = false;
            } else {
                flag = true;
            }
        });
        return flag;
    },


    getMessageTmplate: function() {
        return this.messageTmplate[this.rule];
    },

    scanRule: function(rule) {
        if (rule.indexOf("_") != -1) {
            var ruleArray = rule.split("_");
            return ruleArray;
        }
        return rule;
    },

    getMethod: function(element,parm) {

        valids = new validations(element,parm,this.rule);
        return valids.exec();

    },

    setTemplate: function(field) {
        var message = this.getMessageTmplate();
        var template = new Template(message);
        return template.evaluate({
            field: field,
            parm: this.param
        });
    },

    displayMessage: function(name,message) {
        $(name + "Error").innerHTML = message;
    },

    removeMessage: function(name,message) {
        $(name + "Error").innerHTML = "";
    }

};

var validations = Class.create();

validations.prototype = {

    initialize: function(element,params,rule) {

        this.element = element;
        this.params = params;
        this.rule = rule;
        //alert("init:" + this.element);

    },

    exec: function() {

        return validations.method[this.rule](this.element,this.params);

    },

    rule : null,

    element : null,

    params : null
}

validations.method = {

    // 未入力禁止
    validNotEmpty: function(element,params) {
    var isValid = Field.present(element);
        //var isValid = (element.getValue()) ? true : false;
        if (!isValid) {
            return false;
        }
        return true;
    },

    // 数字のみ許可
    validDigit: function(element,params) {
    val = this.trimVal(element.value);
    if (val.match (/^[1-9][0-9]*$/)){
       return true;
    }
    return false;
    },

    // メールアドレス
    validMail: function(element,params) {
        val = this.trimVal(element.value);
        if (val.match(/^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/)) {
            return true;
        }
        return false;
    },

    // 最大文字数制限
    validMax: function(element,params) {
        var val = element.getValue();
        if (val.length > params) {
            return false;
        }
        return true;
    },

    // 最小文字数制限
    validMin: function(element,params) {
        var val = element.getValue();
        if (val.length < params) {
            return false;
        }
        return true;
    },

    // 指定した文字数と同じ
    validEq: function(element,params) {
        var val = element.getValue();
        if (val.length != params) {
            return false;
        }
        return true;
    },

    // 電話番号
    validPhone: function(element,params) {
        val = this.trimVal(element.value);
        if (val.match(/^[0]{1}[0-9]{1,4}-\d{2,4}-\d{4}$/)) {
            return true;
        }
        return false;
    },

    // 郵便番号 xxx-xxxx
    validPostCode: function(element,params) {
       var val = this.trimVal(element.value);
       if (val.match(/^\d{3}-\d{4}$/)) {
           return true;
       }
       return false;
    },

    // 半角英字のみ A-z
    validAlfa: function(element,params) {
        var val = this.trimVal(element.value);
        if (val.match(/^[A-z]+$/)) {
            return true;
        }
        return false;
    },

    // 全角漢字、ひらがな、カタカナ、スペースを許可
    validTwoBite: function(element,params) {
        var val = this.trimVal(element.value);
        if (val.match(/^[\u3000\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uD840-\uD87F\uDC00-\uDFFF\uF900-\uFAFF]+$/g)) {
            return true;
        }
        return false;
    },

    validRegix: function() {

    },

    trimVal: function(val) {
    return val.replace(/[ \t]+/g, '');
    }

};
