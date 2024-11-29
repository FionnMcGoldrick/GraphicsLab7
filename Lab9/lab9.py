import cv2
import matplotlib.pyplot as plt
import numpy as np

#Original Image
image = cv2.imread('ATU1.jpg')
cv2.imshow('Origial', image)
cv2.waitKey(0)