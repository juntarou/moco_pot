// register.js

window.onload = function() {
    inputClass = new inputClass();
    inputClass.startEvent();
}

// リロード時の非同期通信
// 入力済みのフィールドの記憶用
window.onunload = function(){

    var bodyId = $$("body")[0].id;
    var actionUrl = bodyId.gsub("_","/");
    new Ajax.Request("" + actionUrl,
    {
        method: "post",
        asynchronous: true,
        postBody: Form.serialize($("stForm")) + "&reFlag=1",
        onSuccess: function(httpObj) {
            return;
        }.bind(this)
    });
}

function changeAppendTag(event) {
    //s inputClass = new inputClass();
    inputClass.FormSelectEvent(event);
}

inputClass = Class.create();

inputClass.prototype = {

    // ラベルを格納
    label: new Array(),

    // バリデーションルールを格納
    rules: new Array(),

    // クラス属性input を格納するプロパティ
    inputTags: new Array(),

    // 郵便番号検索ボタンを格納
    zipSearch: new Array(),

    // ボタンアクティブ　フラグ
    validAllowFlags: new Array(),

    // スライダークラス要素
    allActionClass: null,

    // スライダークラス要素数
    actionlength: 0,

    targetElement: null,

    // イベントオブジェクト
    eventObj: null,

    // イベントフラグ
    eventFlag: false,

    // テンプレートエリアオブジェクト
    tempAreas: new Array(),

    // バリデーションインスタンス
    validInstanse: null,

    // フォームタグエレメント
    formElement: new Array(),

    // actionURL
    actionUrl: null,

    // confirmUrl
    confirmUrl: null,

    // baseUrl
    baseUrl: "",

    // zipSeachUrl
    zipSearchUrl: "",
    
    // eval済みのXHRオブジェクト
    responseJson: null,

    currentChangeTemplate: null,

    // コンストラクタ
    initialize: function() {

        // validation formElement init
        this.formElement = $("stForm");

        this.setActionUrl();

        // this page all input tags
        if (this.inputTags.length == 0) {
            this.inputTags = $$(".inputs");
        }

        if (this.zipSearch.length == 0) {
            this.zipSearch = $$(".zipSearch");
        }

        // set label array
        if (this.label.length == 0) {
            this.setLabels();
        }

        // set Validation rules
        if (this.rules.length == 0) {
            this.setValidRules();
        }

        // side menu slide init
        if ($("side_menu")) {
            this.allActionClass = $$(".action");
            this.actionlength = this.allActionClass.length;
        }

    },

    startEvent: function() {
        if (this.eventFlag == false) {
            this.eventObserves();
        }
    },

    eventObserves: function() {

        // スライドメニューがあれば
        if (this.actionlength > 0) {
            // slide event start
            this.allActionClass.each(function(obj){
                Event.observe(obj,"click",this.action.bindAsEventListener(this));
            }.bind(this));
        }

        // 郵便番号検索をイベントリスナに登録
        this.zipSearch.each(function(obj){
            Event.observe(obj,"click", this.zipSerach.bindAsEventListener(this));
        }.bind(this));

        // インプットタグ、セレクトタグをイベントリスナに登録
        this.inputTags.each(function(obj){

            if (obj.tagName == "SELECT") {
                Event.observe(obj,"change", this.FormSelectEvent.bindAsEventListener(this));
            }
            if (obj.tagName == "INPUT") {
                Event.observe(obj,"keyup", this.FormInputEvent.bindAsEventListener(this));
                Event.observe(obj,"blur", this.FormInputEvent.bindAsEventListener(this));
                //Event.observe(obj,"keydown", this.ToolTipsEvent.bindAsEventListener(this));
            }

        }.bind(this));

        Event.observe($("submitBtn"),"click",this.FormSubmitEvent.bindAsEventListener(this));
       
        this.setInitializeLoad();
    },

    zipSerach: function(event) {

        var eventObj = Event.element(event);
        // id命名規則 xxxxZipSearch
        var zipObjId = eventObj.id.sub("Search", "");
        var zipValue = $(zipObjId).getValue();

        if (!zipValue) {
            return;
        }
        var data = Form.Element.serialize(zipObjId);

        new Ajax.Request(this.baseUrl + this.zipSearchUrl,{
            method: "post",
            asynchronous: true,
            postBody:data,
            onSuccess: function(httpObj) {
                this.resultZipSearch(httpObj);
            }.bind(this)
        });

    },

    resultZipSearch: function(httpObj) {
        this.responseJson = eval("("+httpObj.responseText+")");
        if (this.responseJson.post.error) {
            alert(this.responseJson.post.error);
        } else {
            this.setFormsValue();
            this.checkAllowFlag();
        }

    },

    FormSubmitEvent: function(e) {

        var h = null;

        this.tempAreas.each(function(obj) {
            if (Element.visible(obj.id)) {
                for(keys in this.validAllowFlags[obj.id]) {
                    if (!$(keys)) break;
                    if (h == null) {
                        h = "{" + "\"" + keys + "\"" + ":" + "\"" + $(keys).getValue() + "\"";
                    } else {
                        h += "," + "\"" + keys + "\"" + ":" + "\"" + $(keys).getValue() + "\"";
                    }
                }
            }
        }.bind(this));

        h += "}"

        var data = $H(eval("(" + h + ")")).toQueryString();

        request = new Ajax.Request(this.baseUrl + this.confirmUrl,
        {
            method: "post",
            asynchronous: false,
            postBody: data
        });

        document.write(request.transport.responseText);
        document.close();

    },
    

    setInitializeLoad: function(){

        this.tempAreas.each(function(obj){
           if (obj.className.indexOf("staticTable") == -1) {
                Element.setStyle(obj,{display: "none"});
           }
        });

        this.ajaxLoad();

    },

    ajaxLoad: function() {

        new Ajax.Request(this.baseUrl + this.actionUrl,
        {
            method: "post",
            asynchronous: true,
            postBody: Form.serialize(this.formElement.id),
            onSuccess: function(httpObj) {
               this.responseJson = eval("("+httpObj.responseText+")");
               if (this.responseJson.post != null) {
                   this.loadAppendSelectBox();
               }
               this.changeText();
               this.setFormsValue();
               this.changeTemplate();
               if (this.responseJson.post != null) {
                   this.allValidationCheck();
               }
               this.checkAllowFlag();
            }.bind(this)
        });

    },

    ajaxChageLoad: function() {

        new Ajax.Request(this.baseUrl + this.actionUrl,
        {
            method: "post",
            asynchronous: true,
            postBody: Form.serialize(this.formElement.id) + "&reFlag=1",
            onSuccess: function(httpObj) {
               this.responseJson = eval("("+httpObj.responseText+")");
               // changeText
               if (this.responseJson.changeText) {
                   this.changeText();
               }
               this.setFormsValue();
               this.changeTemplate();
               this.allValidationCheck();
               this.checkAllowFlag();
            }.bind(this)
        });

    },


    setFormsValue: function() {

        var json = this.responseJson.post;
        for (keys in json) {
            if ($(keys)) {
                var elem = $(keys);
                switch (elem.tagName){
                    case "INPUT" :
                        elem.value = json[keys];
                        break;
                    case "SELECT" :
                        var index = 0;
                        tmpArray = new Array();
                        resPonseIndex = String(json[keys]);
                        if (resPonseIndex.indexOf(':') != -1) {
                            tmpArray = json[keys].split(':');
                            index = tmpArray[0];
                        } else {
                            for (var i=0; i < elem.options.length; i++) {
                                if (elem.options[i].value == resPonseIndex) {
                                    index = i;
                                    break;
                                }
                            }
                            // null
                            if (!index) index = 0;
                        }
                        elem.selectedIndex = index;
                        break;
                    default:
                        break;
                }

            }
        }

    },

    changeText: function() {
        var resText = this.responseJson.changeText;
        var mixText = null;
        for (key in resText) {
	    if (resText[key] != null) {
		if (mixText == null) {
		    mixText = resText[key] + "年契約";
		} else {
		    mixText += " " + resText[key];
		}
	    }
        }
        Element.update("changeText",mixText);
    },

    changeTemplate: function() {

        // テンプレート切り替え
        // 一旦テンプレートを全て非表示
        this.tempAreas.each(function(temp){
            if (temp.className.indexOf("staticTable") == -1) {
                Element.setStyle(temp,{display: "none"});
            }
        });

        if (this.responseJson.post == null) {
            var defaults = ($$(".default"));
            defaults.each(function(obj) {
                //if (!$(obj.id).visible) {
                Element.setStyle($(obj.id),{display: "block"});
                //}
            });
            return;
        }

        var template = this.responseJson.post.template;

        template = String(template);
        temps = template.split(',');

        if (temps instanceof Array) {

            temps.each(function(val){
                var element = $(val);
                if (!Element.visible(element)) {
                    Element.setStyle(element,{display: "block"});
                }
            });
        } else {
            var element = $(temps);
            if (!Element.visible(temps)) {
                Element.setStyle(element,{display: "block"});
            }
        }
    },

    setActionUrl: function() {
        // bodyタグからajax通信時のurlを取得
    if (!$$("body")[0].id) return;
        var bodyId = $$("body")[0].id;
        this.actionUrl = bodyId.gsub("_","/");
        tmpSp = bodyId.split("_");
        this.confirmUrl = tmpSp[0] + "/" + tmpSp[1] + "/confirm";
    },

    FormSelectEvent: function(event) {

        var resFlag = false;
        var tmpAreaId = null;
        this.eventObj = Event.element(event);

        // read validation class
        this.validInstanse = new ValidateClass(this.eventObj);

        this.tempAreas.each(function(obj) {
            if (Element.childOf(this.eventObj,obj)) {
                tmpAreaId = obj.id;
                resFlag = this.validInstanse.factory(this.rules[this.eventObj.id],this.label[obj.id][this.eventObj.id],false);
            }
        }.bind(this));

        if (resFlag) {
            this.validAllowFlags[tmpAreaId][this.eventObj.id] = true;
            Element.setStyle(this.eventObj,{backgroundColor: "#FFFFFF"});
        } else {
            this.validAllowFlags[tmpAreaId][this.eventObj.id] = false;
            Element.setStyle(this.eventObj,{backgroundColor: "#FF6699"});
        }

        /*
        this.validAllowFlags[tmpAreaId][this.eventObj.id] = resFlag;

        if (!resFlag) {
            this.eventobj.setStyle({backgroundColor: "red"});
        }
        */

        // 特殊セレクトボックス
        if (this.eventObj.hasClassName("pullDownAction")) {

            this.ajaxChageLoad();
        }
        
        if (this.eventObj.hasClassName("tagAppend")) {
            // タグ生成
            this.appendSelectBox(tmpAreaId);
        }
        this.checkAllowFlag();
        this.eventFlag = false;

    },

    FormInputEvent: function(event) {
        if (this.eventFlag) {
            return;
        }
        this.eventFlag = true;
        var resFlag = false;
        var tmpAreaId = null;
        this.eventObj = Event.element(event);

        // read validation class
        this.validInstanse = new ValidateClass(this.eventObj);

        if (this.eventObj.className.indexOf("valid") != -1) {
            this.tempAreas.each(function(obj) {
                if (Element.childOf(this.eventObj,obj)) {
                    tmpAreaId = obj.id;
                    resFlag = this.validInstanse.factory(this.rules[this.eventObj.id],this.label[obj.id][this.eventObj.id],false);
                }
            }.bind(this));

            if (resFlag) {
                this.validAllowFlags[tmpAreaId][this.eventObj.id] = true;
                Element.setStyle(this.eventObj,{backgroundColor: "#FFFFFF"});
            } else {
                 this.validAllowFlags[tmpAreaId][this.eventObj.id] = false;
		 // tooltips init
                 Element.setStyle(this.eventObj,{backgroundColor: "#FF6699"});
                 new Tooltip(this.eventObj,event, {
                    backgroundColor: "#fc9",
                    borderColor: "#C96",
                    textColor: "#000",
                    textShadowColor: "#fff"
                 });
            }


        }

        this.checkAllowFlag();
        this.eventFlag = false;
        
    },

    // 確認ボタンの切り替え　アクティブ:非アクティブ
    checkAllowFlag: function()
    {
        $('submitBtn').enable();

        //alert(this.validAllowFlags.toSource());

        this.tempAreas.each(function(obj) {
            if (Element.visible(obj.id)) {
                for(var keys in this.validAllowFlags[obj.id]) {
                    //alert(keys + ":" + this.validAllowFlags[obj.id][keys]);
                    if (!$(keys)) break;
                    if (!this.validAllowFlags[obj.id][keys]) {
                        $('submitBtn').disable();
                        return;
                    }
                }
            }
        }.bind(this));

    },

    allValidationCheck: function() {

        var template = this.responseJson.post.template;
        template = String(template);
        this.tempAreas.each(function(obj) {
            if (Element.visible(obj.id)) {
                for(keys in this.label[obj.id]) {
                    // read validation class
                    if (!$(keys)) break;
                    if ($(keys).className.indexOf("valid") != -1) {
                        this.validInstanse = new ValidateClass($(keys));
                        this.validAllowFlags[obj.id][keys] = this.validInstanse.factory(this.rules[keys],this.label[obj.id][keys],true);
                    }
                }
            }
        }.bind(this));

    },

    loadAppendSelectBox: function() {

        var Month = 0;
        if (this.responseJson.post.creditCardExpMonth) {
            Month = this.responseJson.post.creditCardExpMonth;
        }

        this.rules['creditCardExpMonth'] = "validNotEmpty";
        this.label['payment_10012']['creditCardExpMonth'] = this.label['payment_10012']['creditCardExpYear']

        var creditExpMonthTag = "<select name='creditCardExpMonth' id='creditCardExpMonth' class='inputs validNotEmpty' onChange='changeAppendTag(event)'>";

        if (Month) {
            this.validAllowFlags['payment_10012']['creditCardExpMonth'] = true;
            creditExpMonthTag += "<option value=''>選択して下さい</option>";
        } else {
            this.validAllowFlags['payment_10012']['creditCardExpMonth'] = false;
            creditExpMonthTag += "<option value='' selected='selected'>選択して下さい</option>";
        }


        var value = this.responseJson.post.creditCardExpYear;

        var spValue = value.split(':');

        var count = this.getCurrentMonth(spValue[1]);

        do{

            creditExpMonthTag += "<option value=" + count + ">" + count + "月</option>";
            count += 1;

        }while(count != 13);

        creditExpMonthTag += "</select>";


        if ($('creditCardExpMonth')) {
            Element.remove('creditCardExpMonth');
        }

        new Insertion.After("creditCardExpYear",creditExpMonthTag);

    },

    appendSelectBox: function(tmpAreaId) {

        var value = this.eventObj.getValue();

        var monthId = this.eventObj.id.sub("Year","Month");

        if (!value) {
            if ($(monthId)) {
                Element.remove(monthId);
            }
            return;
        }

        this.rules[monthId] = "validNotEmpty";

        this.validAllowFlags[tmpAreaId][monthId] = false;

        this.label[tmpAreaId][monthId] = this.label[tmpAreaId][this.eventObj.id];

        var spValue = value.split(":");
        var current = this.getCurrentMonth(spValue[1]);

        var creditExpMonthTag = "<select name=" + monthId + " id=" + monthId + " class='inputs validNotEmpty' onChange='changeAppendTag(event)'>";

        creditExpMonthTag += "<option value='' selected='selected'>選択して下さい</option>";

        //this.validAllowFlags[]

        do{

            creditExpMonthTag += "<option value=" + current + ">" + current + "月</option>";
            current += 1;

        } while(current != 13);

        creditExpMonthTag += "</select>";


        if ($(monthId)) {
            Element.remove(monthId);
        }

        new Insertion.After("creditCardExpYearError",creditExpMonthTag);

    },

    getCurrentMonth: function(value) {
        dateObj = new Date();
        var current = 1;
        if (parseInt(value) == parseInt(dateObj.getFullYear())) {
            current = dateObj.getMonth() + 1;
        }
        return current;
    },

    // ラベル,許可フラグをセット
    setLabels: function()
    {

        var labels = $$("label");
        var elements = $$("div","table");

        elements.each(function(obj){

            if (Element.hasClassName(obj,"registTable")) {
                var id = obj.id;
                this.tempAreas.push(obj);
                this.label[id] = new Object();
                //alert(Object.keys(this.label));
                this.validAllowFlags[id] = new Object();
                labels.each(function(obj2){
                    if (Element.childOf(obj2,obj.id)) {
                        this.label[obj.id][obj2.htmlFor] = obj2.firstChild.nodeValue;
                        if ($(obj2.htmlFor).className.indexOf("valid") != -1) {
                            this.validAllowFlags[obj.id][obj2.htmlFor] = false;
                        } else {
                            this.validAllowFlags[obj.id][obj2.htmlFor] = true;
                        }
                    }
                }.bind(this));
                
            }
        }.bind(this));

    },

    // バリデーションルールをセット
    setValidRules: function() {

        var tmpRules = null;

        this.inputTags.each(function(obj) {
            tmpRules = obj.className.split(" ");
            result = tmpRules.grep(/valid/i,function(value,index) {
                //return value.substring(5);
                return value
            });

            this.rules[obj.id] = result;

        }.bind(this));

    },

    // side menu toggle controll
    action: function(e) {
        this.targetElement = Event.element(e);
        var node = this.targetElement;
        count = 0;
        // 該当クラスが見当たらず無限ループしそうになったら、
        // カウント20で強制終了する
        do {
            count++;
            node = node.nextSibling;
        }while(node.className != "disp" || count > 20);

        try {

            if (!node) {
                throw "disp class not found";
            }

            clearInterval(node.timer);

            if (Element.visible(node)) {
                node.style.height = "auto";
                node.style.overflow = "hidden";
                node.timer = setInterval(function() {
                    this.effectUp(node)
                    }.bind(this),10);
            } else {
                if (node.maxh && node.maxh <= node.offsetHeight) {
                    return;
                }
                node.style.display = "block";
                node.style.height = "auto";
                node.maxh = node.offsetHeight;
                node.style.height = 0 + "px";
                node.timer = setInterval(function() {
                    this.effectDown(node)
                    }.bind(this),10);
            }
        } catch (er) {
            alert(er);
        }

        Event.stop(e);
    },

    effectUp: function(node) {
        var clunt = node.offsetHeight;
        var dist = (Math.round(clunt / 10));
        dist = (dist <= 1) ? 1 : dist;
        node.style.height = clunt - dist + 'px';
        if (clunt < 2) {
            node.style.display = "none";
            clearInterval(node.timer);
        }
    },

    effectDown: function(node) {
        var clunt = node.offsetHeight;
        var dist = (Math.round((node.maxh - clunt) / 10));
        dist = (dist <= 1) ? 1 : dist;
        node.style.height = clunt + dist + 'px';
        if (clunt > (node.maxh - 2)) {
            node.style.display = "block";
            clearInterval(node.timer);
        }
    }

}
