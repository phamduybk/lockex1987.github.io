'''
Clean HTML
Delete regular expression
	style=".*"
	class=".*"
	id=".*"
	name=".*"
Replace &nbsp; with one space
	&nbsp;
	
Van con nhieu the span thua

'''
import sys
import re


file_path = sys.argv[1]

with open(file_path, 'r') as in_file:
    data = in_file.read()
    for s in ['style', 'class', 'id', 'name', 'ng-if', 'ng-click', 'ng-non-bindable', 'spellcheck', 'border', 'cellpadding', 'cellspacing', 'data-lazy-type', 'data-lazy-src', 'data-lazy-srcset', 'data-lazy-sizes', 'data-file-', 'rel', 'height', 'width', 'alt', 'scope', 'srcset']:
        data = re.sub(s + '="[^"]*"', '', data)
    data = data.replace('&nbsp;', ' ')
    data = data.replace(r'<p><a></a></p>', '')
    for s in ['span', 'div', 'header', 'strong', 'em']:
        data = data.replace('<' + s + '>', '')
        data = data.replace('</' + s + '>', '')

with open(file_path, 'w') as out_file:
    out_file.write(data)	
