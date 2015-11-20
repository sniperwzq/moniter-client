$(document).ready(function () {
	xiuxiu.onInit = function (id)
	{
        xiuxiu.setUploadURL(uploadImage.uploadUrl);
        xiuxiu.setUploadType(2);
        xiuxiu.setUploadDataFieldName(uploadImage.fieldName);
		xiuxiu.loadPhoto(uploadImage.defaultPhoto);
	}
	xiuxiu.onUploadResponse = function (data)
	{
		eval('data='+data);
        if(data.error) {
			_alert('上传失败', false);
		}
		else {
			uploadImage.defaultPhoto = data.url;
			xiuxiu.loadPhoto(uploadImage.defaultPhoto);
			_set_xiuxiu_img(data.url);
			_close_xiuxiu_windows();
		}
	}
	xiuxiu.onDebug = function (data)
	{
        alert("错误响应" + data);
	}
	xiuxiu.onClose = function (id)
	{
		$('#flashEditorOut').hide();
	}
	$('body').append('<div id="flashEditorOut" style="display:none;position:fixed;top:50%;left:50%;margin-left:-350px;margin-top:-250px;padding:12.5px;border:1px solid gray;-webkit-border-radius:10px;border-radius:10px;background:#fff"><div id="close_flashEditorOut" style="position:absolute;width:30px;height:30px;top:-15px;right:-15px;-webkit-border-radius:100px;border-radius:100px;border:1px solid black;line-height:30px;text-align:center;z-index:999;background:#fff;"><img src="http://bbs.admin.seeyouyima.com/appearance/images/delete.gif" /></div><div id="altContent2"><h1>美图秀秀</h1></div></div>');
	$('#close_flashEditorOut').live('click', function() {
		_close_xiuxiu_windows();
	});
});
function _open_xiuxiu_windows() {
	$('#flashEditorOut').show();
}

function _close_xiuxiu_windows() {
	$('#flashEditorOut').hide();
}
function _set_xiuxiu_img(img) {
	$(uploadImage.srcObject).attr('src', img);
	$(uploadImage.inputObject).val(img);
}