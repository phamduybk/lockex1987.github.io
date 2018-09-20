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
	for s in ['style', 'class', 'id', 'name']:
		data = re.sub(s + '="[^"]*"', '', data)
	data = data.replace('&nbsp;', ' ')
	data = data.replace(r'<span>', '')
	data = data.replace(r'</span>', '')

with open(file_path, 'w') as out_file:
	out_file.write(data)
