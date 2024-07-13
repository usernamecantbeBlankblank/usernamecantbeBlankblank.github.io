import os

def rename_mp3_files(directory):
    files = [f for f in os.listdir(directory) if f.endswith('.mp3')]
    for index, file in enumerate(files):
        new_name = f"f{index + 1}.mp3"
        os.rename(os.path.join(directory, file), os.path.join(directory, new_name))
    print(f"{len(files)} files renamed.")

directory = r'c:\Users\bianc\OneDrive\Dokumente\GitHub\usernamecantbeBlankblank.github.io\Assets\voices\fridolin'
rename_mp3_files(directory)