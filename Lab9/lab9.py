import cv2
import matplotlib.pyplot as plt
import numpy as np

# Variables
blockSize = 2
aperture_size = 3
k = 0.04

R = 255
G = 0
B = 0

nrows = 3
ncols = 2

maxCorners = 100
qualityLevel = 0.01
minDistance = 10

# Original Image
image = cv2.imread('ATU1.jpg')

#Second Image
image2 = cv2.imread('one-piece.jpg')

# GrayScale Image
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)



# Normalize the result to be in the range [0, 255]
#dst = cv2.dilate(dst, None)
imgHarris = image.copy()  # Create a deep copy of the original image

# Threshold for an optimal value, marking the corners
#imgHarris[dst > 0.01 * dst.max()] = [0, 0, 255]  # Draw red circles at detected corners

# CornerHarris
dst = cv2.cornerHarris(gray_image, blockSize, aperture_size, k)



#Corner
corners = cv2.goodFeaturesToTrack(gray_image,maxCorners,qualityLevel,minDistance)
corners = np.int0(corners) #convert corners values to integer


#Another deep copy of orignal image
imgShiTomasi = image.copy()

#Setting corners to imgShiTomasi
for i in corners:
    x,y = i.ravel()
    cv2.circle(imgShiTomasi,(x,y),3,(B, G, R),-1)


threshold = 0.1; #number between 0 and 1
for i in range(len(dst)):
    for j in range(len(dst[i])):
        if dst[i][j] > (threshold*dst.max()):
            cv2.circle(imgHarris,(j,i),3,(B, G, R),-1)


#Orbs
orb = cv2.ORB_create()
 
# find the keypoints with ORB
kp = orb.detect(image,None)
 
# compute the descriptors with ORB
kp, des = orb.compute(image, kp)
 
# draw only keypoints location,not size and orientation
img2 = cv2.drawKeypoints(image, kp, None, color=(0,255,0), flags=0)

#New Image Orbs
# find the keypoints with ORB
kp = orb.detect(image2,None)
 
# compute the descriptors with ORB
kp, des = orb.compute(image2, kp)
 
# draw only keypoints location,not size and orientation
image2 = cv2.drawKeypoints(image2, kp, None, color=(0,255,0), flags=0)



#Subplotted Images
plt.subplot(nrows, ncols, 1), plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('Original'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 2), plt.imshow(cv2.cvtColor(gray_image, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('Grayscale'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 3), plt.imshow(cv2.cvtColor(imgHarris, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('image-harris'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 4), plt.imshow(cv2.cvtColor(imgShiTomasi, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('ShiTomasi'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 5), plt.imshow(cv2.cvtColor(img2, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('Orbs'), plt.xticks([]), plt.yticks([])

plt.subplot(nrows, ncols, 6), plt.imshow(cv2.cvtColor(image2, cv2.COLOR_BGR2RGB), cmap='gray')
plt.title('One Piece'), plt.xticks([]), plt.yticks([])



plt.show()



cv2.destroyAllWindows()


