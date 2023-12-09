package com.twinkle.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.twinkle.shopapp.models.Provider;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProviderDTO {

    @JsonProperty("name")
    @Size(min = 3, max = 200, message = "Tên phải từ 5 tới 200 ký tự")
    private String name;

    @JsonProperty("address")
    @Size(min = 3, max = 200, message = "Địa chỉ phải từ 9 tới 200 ký tự")
    private String address;

    @JsonProperty("website")
    @Size(min = 9, max = 255, message = "Website phải từ 9 tới 255 ký tự")
    private String website;

    @JsonProperty("phone_number")
    @Size(min = 9, max = 15, message = "Sdt phải từ 9 tới 11 ký tự")
    private String phoneNumber;

    @JsonProperty("email")
    @Size(min = 9, max = 200, message = "Email phải từ 9 tới 200 ký tự")
    private String email;

    @JsonProperty("description")
    private String description;


    public static ProviderDTO fromProvider(Provider provider) {
        return ProviderDTO.builder()
                .name(provider.getName())
                .address(provider.getAddress())
                .website(provider.getWebsite())
                .phoneNumber(provider.getPhoneNumber())
                .email(provider.getEmail())
                .description(provider.getDescription())
                .build();
    }
}
