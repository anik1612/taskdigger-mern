import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import * as productAction from '../Actions/productAction';
import ErrorMessage from '../Components/Message/errorMessage';
import Rating from '../Components/Rating/Rating';
import { Button } from '@material-ui/core/';
import * as productConstants from '../Constants/productConstants';
import SinglePageLoader from '../Components/Loader/SinglePageLoader';
import { addToCart } from '../Actions/cartAction';
import * as routes from '../Constants/routes';

const ProductDetails = ({ match, history }) => {
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo } = userAuthData;

  const [qty] = useState(1);

  const productData = useSelector((state) => state.Product);
  const reviewResponses = useSelector((state) => state.createReview);

  const { error: createReviewError } = reviewResponses;

  const { loading, product, error } = productData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.product(match.params.productId));
    // eslint-disable-next-line
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.productId, qty));
    history.push(routes.CART);
  };

  return (
    <>
      {createReviewError && (
        <ErrorMessage header="Opps!!!" message={createReviewError} reset={productConstants.CREATE_REVIEW_RESET} />
      )}
      <Link className="btn btn-light my-3" to={routes.HOME}>
        Go Back
      </Link>
      {loading ? (
        <SinglePageLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Row>
            <Col md={9}>
              <Image src={product?.productImage} alt={product?.name} fluid className="d-block mx-auto rounded" />
              <ListGroup variant="flush mt-5">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.averageRating}
                    text={`${product?.Reviews ? product?.Reviews.length : 0} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Buyer:</Col>
                      <Col>{userInfo.name}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button variant="contained" color="primary" onClick={addToCartHandler} fullWidth>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* <ProductReview productId={match.params.productId} /> */}
        </>
      )}
    </>
  );
};
export default ProductDetails;
