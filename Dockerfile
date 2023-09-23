# 指定node镜像
FROM node:16-alpine as builder


# 指定工作目录
WORKDIR /code

# 代码复制到工作目录
ADD . /code

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 打包
RUN npm run build



# 指定nginx镜像
FROM nginx:alpine

# 创建nginx日志目录数据卷
VOLUME ["/var/log/nginx"]

# 复制打包后的代码到nginx容器中
COPY --from=builder /code/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 8080
