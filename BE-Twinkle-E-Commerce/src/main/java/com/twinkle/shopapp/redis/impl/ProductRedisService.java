package com.twinkle.shopapp.redis.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twinkle.shopapp.models.Product;
import com.twinkle.shopapp.redis.IProductRedisService;
import com.twinkle.shopapp.responses.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductRedisService implements IProductRedisService {

    // redis Template & Object Mapper: Convert và mapping data từ ProductResponse -> JSON String
    private final RedisTemplate<String, Object> redisTemplate;

    private final ObjectMapper redisObjectMapper;

    public String getKeyFromGetAllProducts(String keyword, Long categoryId, Float size, String orderBy, String selectedPriceRate, String selectedProvider, PageRequest pageRequest){
        int pageNumber = pageRequest.getPageNumber();
        int pageSize = pageRequest.getPageSize();
        Sort sort = pageRequest.getSort();
        String sortDirection = sort.getOrderFor("d.price")
                .getDirection() == Sort.Direction.ASC ? "asc" : "desc";
        String key = String.format("all_products:%d:%d:%s:%s:%s:%s:%s:%s:%s", pageNumber, pageSize, sortDirection, keyword, categoryId.toString(), size.toString(), orderBy, selectedPriceRate, selectedProvider);
        return key;
    }

    public String getKeyFromGetProductsByBrands(String brand)
    {
        String key = String.format("products_by_brands:%s", brand);
        return key;
    }


    @Override // clear cache
    public void clear() {
        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Override // lấy hết cache
    public List<ProductResponse> getAllProducts(String keyword, Long categoryId, Float size, String orderBy, String selectedPriceRate, String selectedProvider, PageRequest pageRequest) throws JsonProcessingException {
        String key = this.getKeyFromGetAllProducts(keyword, categoryId, size, orderBy, selectedPriceRate, selectedProvider, pageRequest);
        String json = (String) redisTemplate.opsForValue().get(key);
        List<ProductResponse> productResponses = json != null ?
                redisObjectMapper.readValue(json, new TypeReference<List<ProductResponse>>() {})
                : null;
        return productResponses;
    }

    @Override
    public List<ProductResponse> getProductsByBrands(String brand) throws JsonProcessingException
    {
        String key  = this.getKeyFromGetProductsByBrands(brand);
        String json = (String) redisTemplate.opsForValue().get(key);
        List<ProductResponse> productResponses = json != null ?
                redisObjectMapper.readValue(json, new TypeReference<List<ProductResponse>>() {})
                : null;
        return productResponses;
    }

    @Override
    public void saveProductsByBrands(List<ProductResponse> productResponses, String brand) throws JsonProcessingException {
        String key = this.getKeyFromGetProductsByBrands(brand);
        String json = redisObjectMapper.writeValueAsString(productResponses);
        redisTemplate.opsForValue().set(key, json);
    }

    @Override // Lưu cache
    public void saveAllProducts(List<ProductResponse> productResponses, String keyword, Long categoryId, Float size, String orderBy, String selectedPriceRate, String selectedProvider, PageRequest pageRequest) throws JsonProcessingException {
        String key = this.getKeyFromGetAllProducts(keyword, categoryId, size, orderBy, selectedPriceRate, selectedProvider, pageRequest);
        String json = redisObjectMapper.writeValueAsString(productResponses);
        redisTemplate.opsForValue().set(key, json);
    }





}
