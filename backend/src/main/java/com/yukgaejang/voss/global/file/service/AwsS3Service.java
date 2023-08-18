package com.yukgaejang.voss.global.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.yukgaejang.voss.global.file.service.dto.CreateFileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3Service {
 
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
 
    private final AmazonS3 amazonS3;

    public String uploadOnlyOneMultiFile(MultipartFile multipartFile, String dirName) {
        String fileName = createFileName(multipartFile.getOriginalFilename(), dirName);
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, null)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
        return fileName;
    }
 
    public List<CreateFileRequest> uploadMultiFile(List<MultipartFile> multipartFile, String dirName) {
        List<CreateFileRequest> files = new ArrayList<>();
        for (MultipartFile file : multipartFile) {
            String fileName = createFileName(file.getOriginalFilename(), dirName);
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }

            files.add(new CreateFileRequest(file.getOriginalFilename(), fileName, file.getContentType(), file.getSize()));
        }
        return files;
    }

    public void deleteFile(String fileName, String dirName) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, dirName + "/" + fileName));
    }
 
    // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 UUID를 붙여준다.
    private String createFileName(String fileName, String dirName) {
        return dirName + "/" + UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }
 
    // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였다.
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}