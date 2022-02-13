###Timecard Typer GUI###
###python3 RAW_JPG_Organizer.py

from tkinter import *
from tkinter.filedialog import askdirectory
import sys
import os
import shutil

class Root(Tk):
    def __init__(self):
        super(Root,self).__init__()
        self.title("Script Running GUI") #Application Title
        self.geometry("375x100") #Window Size
        self.create_widgets()
        self.close_window()
        #self.open_file()
        #self.run()

    def open_file(self):
        folder = askdirectory(initialdir='/Users/kurtlavacqueresearch')
        #print(folder)
        self.folder = folder


    """def organize(self):
        action_name = 'python ' + self.filename
        print(action_name)
        os.system(action_name)"""

    def directory_path(self):
        print(self.folder)
        while True:
            #combined_folder = input('\nWhere are the files?\n') #Input the file location
            #remove = "\\"
            #for c in remove:
                #combined_folder = combined_folder.replace(c, "")
                #combined_folder = combined_folder[:-1]
            before_type = self.folder[:29] #It slices part before the "JPG/"
            after_type = self.folder[32:] #And slices the part after the "JPG/"
            source = os.listdir(self.folder) #Collects all of the names of the files in a list
            file_type = "RAW/"
            new_folder = before_type + file_type + after_type #Combines the first slice and second slice with a new file type "RAW/
            if not os.path.exists(new_folder): #If there is not a folder
                os.makedirs(new_folder) #It will create a new one with the same name as the folder it came from
            for files in source: #For all of the pictures 
                if files.endswith('.CR2'): #That are .CR2
                        shutil.move(os.path.join(self.folder,files), os.path.join(new_folder,files)) #Move the files from the original folder to the new one
            #user_input = input("Another?\nEnter y/n\n")
            #if user_input == "y":
                #continue
            #elif user_input == "n":
                #print("Ok thats cool, See ya next time")
                #break
            #else:
                #print("Enter y/n")
                #continue

    def create_widgets(self):

        spacer1 = Label(self, text = "            ") #Space between the Buttons and Header
        spacer1.grid(column = 1, row = 2, columnspan = 1)

        header = Label(self, text = "\tWelcome to the RAW JPG Organizer") #
        header.grid(column = 1, row = 1, columnspan = 3)

        run_script_b = Button(self, text = "Browse", command = self.open_file)
        run_script_b.grid(column = 2, row = 3)

        run_script_b = Button(self, text = "Organize", command = self.directory_path)
        run_script_b.grid(column = 3, row = 3)


    

    def close_window(self):
        close_b = Button(self, text = "Close", command = self.quit)
        close_b.grid(column = 2, row = 4, columnspan = 2)


root = Root()
root.mainloop()




#y = "yes"
        		
#directory_path(y)