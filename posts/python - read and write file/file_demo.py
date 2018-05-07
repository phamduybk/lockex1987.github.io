f = open('file_demo_sample.txt', 'r')
print(f)
f.close()
print("Finish")

with open('file_demo_sample.txt', 'r') as f:
    data = f.read()
    print(data)

print("OK")
