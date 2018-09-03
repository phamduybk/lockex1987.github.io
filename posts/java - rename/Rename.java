import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Rename {

	public static void main(String[] args) {
		String cm = args[0];
		List<File> a = Arrays.asList(new File(args[1]).listFiles());
		switch (cm) {
		case "pr":
			prefix(a, args[2]);
			break;
		case "pt":
			postfix(a, args[2]);
			break;
		case "lc":
			lowerCase(a);
			break;
		case "lt":
			leftTrim(a, Integer.parseInt(args[2]));
			break;
        case "fl":
			fixLength(a, Integer.parseInt(args[2]));
			break;
		case "rt":
			rightTrim(a, Integer.parseInt(args[2]));
			break;
		case "et":
			changeExtension(a, "." + args[2], "." + args[3]);
			break;
		case "rc":
			removeCharacter(a, (args.length > 2) ? args[2] : "");
			break;
		case "sf":
			sortFile(a, (args.length > 2) ? args[2] : "");
			break;
		case "z":
			compress(a);
			break;
		case "mc":
			mangaChapter(a);
			break;
		default:
			System.out.println("Invalid command");
			break;
		}
	}

	public static void prefix(List<File> a, String prefix) {
		a.forEach(f -> f.renameTo(new File(f.getParentFile(), prefix + f.getName().toLowerCase())));
	}

    public static void postfix(List<File> a, String postfix) {
		a.stream().forEach(f -> {
			String fullName = f.getName();
			int idx = fullName.lastIndexOf(".");
			String name = fullName.substring(0, idx);
			String ext = fullName.substring(idx);
			String nn = name + postfix + ext;
            //System.out.println(nn);
			f.renameTo(new File(f.getParentFile(), nn));
		});
	}

	public static void lowerCase(List<File> a) {
		a.forEach(f -> f.renameTo(new File(f.getParentFile(), f.getName().toLowerCase())));
	}

	public static void leftTrim(List<File> a, int num) {
		a.forEach(f -> f.renameTo(new File(f.getParentFile(), f.getName().substring(num))));
	}

    public static void fixLength(List<File> a, int num) {
		a.forEach(f -> f.renameTo(new File(f.getParentFile(), f.getName().substring(0, num))));
	}

	public static void rightTrim(List<File> a, int num) {
		a.stream().filter(f -> f.isFile()).forEach(f -> {
			String fullName = f.getName();
			int idx = fullName.lastIndexOf(".");
			String name = fullName.substring(0, idx - num);
			String ext = fullName.substring(idx);
			String nn = name + ext;
			f.renameTo(new File(f.getParentFile(), nn));
		});

		a.stream().filter(f -> f.isDirectory()).forEach(f -> {
			String on = f.getName();
			String nn = on.substring(0, on.length() - num);
			f.renameTo(new File(f.getParentFile(), nn));
		});
	}

	public static void changeExtension(List<File> a, String oe, String ne) {
		a.stream().filter(f -> f.isFile()).forEach(f -> {
			String fullName = f.getName();
			int idx = fullName.lastIndexOf(".");
			String name = fullName.substring(0, idx);
			String ext = fullName.substring(idx);

			if (ext.toLowerCase().equals(oe)) {
				f.renameTo(new File(f.getParentFile(), name + ne));
			}
		});
	}

	public static void removeCharacter(List<File> a, String other) {
		a.forEach(f -> {
			String nn = f.getName().replace("_", " ").replace(":", " - ");
			if (!other.isEmpty()) {
				nn = nn.replace(other, "");
			}
			f.renameTo(new File(f.getParentFile(), nn));
		});
	}

	public static void sortFile(List<File> a, String prefix) {
		a.sort((o1, o2) -> {
			return o1.getName().compareTo(o2.getName());
		});
		int i = 0;
		for (File f : a) {
			String on = f.getName();
			String ext = on.substring(on.lastIndexOf(".")).toLowerCase();
			String nn = prefix + String.valueOf(1001 + i).substring(1) + ext;
			System.out.println(on + " -> " + nn);
			f.renameTo(new File(f.getParentFile(), nn));
			i += 1;
		}
	}

	public static void mangaChapter(List<File> a) {
		a.forEach(f -> {
			String on = f.getName();
			int i = on.lastIndexOf(' ');
			String prefix = (i >= 0 ? on.substring(i + 1, on.length()) : on) + "-";
			sortFile(Arrays.asList(f.listFiles()), prefix);

			// Chuyen cac file ra ngoai
			Arrays.asList(f.listFiles()).forEach(e -> {
				e.renameTo(new File(f.getParentFile(), e.getName()));
			});
		});
	}

	public static void compress(List<File> a) {
		a.sort((o1, o2) -> {
			return o1.getName().compareTo(o2.getName());
		});

		a.stream().filter(f -> f.isDirectory()).forEach(f -> {
			compress(f, new File(f.getParentFile(), f.getName() + ".zip"));
		});
	}

	public static void compress(File folder, File archive) {
		System.out.println("Zipping " + folder.getName());
		try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(archive))) {
			List<File> files = Arrays.asList(folder.listFiles());
			files.sort((o1, o2) -> {
				return o1.getName().compareTo(o2.getName());
			});
			for (File f : files) {
				System.out.print(f.getName() + "\r");
				addZipEntry(f, zos);
			}
			System.out.println("\nDone");
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	private static void addZipEntry(File file, ZipOutputStream zos) throws IOException {
		ZipEntry ze = new ZipEntry(file.getName());
		zos.putNextEntry(ze);

		FileInputStream fis = new FileInputStream(file);
		byte[] buffer = new byte[1024];
		int count;
		while ((count = fis.read(buffer)) > 0) {
			zos.write(buffer, 0, count);
		}
		fis.close();

		zos.closeEntry();
	}
}
