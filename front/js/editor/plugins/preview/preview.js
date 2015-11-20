/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('preview', function(K) {
	var self = this, name = 'preview', undefined;
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
		    template = '<!doctype html><html><head><meta charset="utf-8"/><title>西柚-月经周期助手，最贴心的经期应用！</title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/><meta name="description" content="西柚经期助手，提供月经记录、经期跟踪等多功能应用，及时提醒女性经期护理，让生活更舒心！西柚经期助手，中国女性的正确选择！" /><meta name="Keywords" content="西柚,大姨妈,月经助手,经期助手,月经应用,经期应用,经期记录,经期跟踪,月经记录,月经跟踪,月经预测,经期预测,经期护理" /><style type="text/css">embed{display:block;margin:10px auto;border: 8px solid #FFFFFF;box-shadow: 0 1px 5px #B1B7B4;}</style><link rel="stylesheet" href="//data.seeyouyima.com/static/tip-detail2.0.css"/></head><body><h1>'
		    			+ $('#title').val() +'</h1>',
		    		   
			html = '<div style="padding:10px 20px;">' +
				'<iframe class="ke-textarea" frameborder="0" style="width:708px;height:400px;"></iframe>' +
				'</div>',
			dialog = self.createDialog({
				name : name,
				width : 750,
				title : self.lang(name),
				body : html
			}),
			iframe = K('iframe', dialog.div),
			doc = K.iframeDoc(iframe);
		doc.open();
		doc.write(template + self.fullHtml() + '</body>');
		doc.close();
		K(doc.body).css('background-color', '#FFF');
		iframe[0].contentWindow.focus();
	});
});
