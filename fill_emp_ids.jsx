// Illustrator: ใส่ Emp. ID จาก emp_ids.txt ลงใน text frame ที่เลือกไว้ ตามลำดับ (บน->ล่าง, ซ้าย->ขวา)
var f = File.openDialog("เลือกไฟล์ emp_ids.txt");
f.open("r"); f.encoding = "UTF-8";
var ids = f.read().split(/\r?\n/).filter(function(s){return s.length});
f.close();

var doc = app.activeDocument, frames = [];
for (var i = 0; i < doc.selection.length; i++)
    if (doc.selection[i].typename == "TextFrame") frames.push(doc.selection[i]);
if (!frames.length) { alert("เลือก text frame ที่จะใส่เลขก่อน (Select > All ได้)"); }
else {
    frames.sort(function(a,b){
        var ay=Math.round(a.top/5), by=Math.round(b.top/5);
        return ay!=by ? by-ay : a.left-b.left;
    });
    var n = Math.min(frames.length, ids.length);
    for (var j = 0; j < n; j++) frames[j].contents = ids[j];
    alert("ใส่แล้ว " + n + " ช่อง (text frame " + frames.length + ", ID " + ids.length + ")");
}
