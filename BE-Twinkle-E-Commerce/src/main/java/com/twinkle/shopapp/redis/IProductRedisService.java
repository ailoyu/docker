package com.twinkle.shopapp.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.twinkle.shopapp.models.Product;
import com.twinkle.shopapp.responses.ProductResponse;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductRedisService {

    void clear();

    List<ProductResponse> getAllProducts(
            String keyword, // search
            Long categoryId, // tìm theo thể loại
            Float size,
            String orderBy,
            String selectedPriceRate,
            String selectedProvider,
            PageRequest pageRequest
            ) throws JsonProcessingException;

    List<ProductResponse> getProductsByBrands(String brand) throws JsonProcessingException;


    void saveProductsByBrands(List<ProductResponse> product, String brand) throws JsonProcessingException;

    void saveAllProducts(
            List<ProductResponse> productResponses,
            String keyword, // search
            Long categoryId, // tìm theo thể loại
            Float size,
            String orderBy,
            String selectedPriceRate,
            String selectedProvider,
            PageRequest pageRequest
    ) throws JsonProcessingException;


}
