interface MyWindow extends Window {
  Covy: any; // specify the actual type instead of 'any' if possible
}
declare let window: MyWindow;
