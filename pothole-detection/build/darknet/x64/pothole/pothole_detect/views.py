from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import os


class tests(APIView):
     
    def get(self, request):
        p1 = test.objects.get(name='warda')
        serializer = TestSerializer(p1)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class images(APIView) :
    
    def post(self,request,format=None) :
        data = request.data
        x = ImageSerializer(data=data)
        if x.is_valid():
            path=x.save()
            pathString=str(path.image)
    #put your code here
            
            os.system("darknet.exe detector test cfg/obj.data cfg/yolo-voc.2.0.cfg backup/yolo-voc_500.weights pothole/media/"+pathString)
            os.system("MOVE predictions.jpg pothole/media/images")
            ##
            return Response({'valid':True,'errors':'null','path':"media/images/predictions.jpg"}, status=status.HTTP_201_CREATED)

    


