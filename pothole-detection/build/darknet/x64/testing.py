import os

os.system(
    "darknet.exe detector test cfg/obj.data cfg/yolo-voc.2.0.cfg backup/yolo-voc_500.weights")