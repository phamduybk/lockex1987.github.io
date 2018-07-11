import sys
import os
import os.path
import shutil


# Cac bien toan cuc
cmd = sys.argv[1]
folder = sys.argv[2]
files = os.listdir(folder)


def extract_names(file):
    '''
    Tra ve ten file (khong bao gom duoi mo rong)
    va duoi mo rong
    '''
    idx = file.rfind('.')
    return (file[:idx], file[idx:])


def get_zero_name(idx):
    return str(1001 + idx)[1:]


def process_zip():
    for f in files:
        base_name = os.path.join(folder, f)
        if os.path.isdir(base_name):
            shutil.make_archive(base_name, 'zip', base_name)
            print('Zipped:', f)


def process_manga_chapters():
    print("Sort, prefix with chapter's name, move to outer folder")
    for sub in files:
        base_name = os.path.join(folder, sub)
        if os.path.isdir(base_name):
            sub_files = os.listdir(base_name)
            sub_files.sort()
            for i, f in enumerate(sub_files):
                ext = extract_names(f)[1]
                new_name = sub + "-" + get_zero_name(i) + ext
                os.rename(os.path.join(base_name, f), os.path.join(folder, new_name))


def main():
    files.sort()

    if cmd == 'z':
        process_zip()
    elif cmd == 'mc':
        process_manga_chapters()
    else:
        for i, f in enumerate(files):
            if cmd == 'lc':
                new_name = f.lower()
            elif cmd == 'pr':
                new_name = sys.argv[3] + f
            elif cmd == 'lt':
                new_name = f[int(sys.argv[3]):]
            elif cmd == 'rt':
                (file_name, ext) = extract_names(f)
                new_name = file_name[:-int(sys.argv[3])] + ext
            elif cmd == 'sf':
                ext = extract_names(f)[1]
                new_name = get_zero_name(i) + ext
            elif cmd == 'rc':
                new_name = f.replace('-', ' ')
            elif cmd == 'et':
                (file_name, ext) = extract_names(f)
                new_name = (file_name + '.' + sys.argv[4]) if (ext == '.' + sys.argv[3]) else f

            #print(new_name)
            os.rename(os.path.join(folder, f), os.path.join(folder, new_name))


main()

