package org.o7planning.tutorial.hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyJpaCompliantImpl;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;

import cttd.hibernate.bo.EmployeeBo;

public class HibernateUtils {

	private static final SessionFactory sessionFactory = buildSessionFactory();

	// Hibernate 5:
	private static SessionFactory buildSessionFactory() {
		try {
			// Tạo đối tượng ServiceRegistry từ hibernate.cfg.xml
			ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
					.configure("hibernate.cfg.xml")
					.build();

			// Tạo nguồn siêu dữ liệu (metadata) từ ServiceRegistry
//			Metadata metadata = new MetadataSources(serviceRegistry)
//					.getMetadataBuilder()
//					.build();
			
			Metadata metadata = new MetadataSources(serviceRegistry)
				    .addAnnotatedClass(EmployeeBo.class)
				    //.addAnnotatedClassName("cttd.hibernate.bo.EmployeeBo")
				    //.addResource("org/hibernate/example/Order.hbm.xml")
				    //.addResource("org/hibernate/example/Product.orm.xml")
					// addPackage khong an
					.addPackage("cttd.hibernate.bo")
				    .getMetadataBuilder()
				    .applyImplicitNamingStrategy(ImplicitNamingStrategyJpaCompliantImpl.INSTANCE)
				    .build();

			return metadata.getSessionFactoryBuilder().build();
		} catch (Throwable ex) {

			System.err.println("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static void shutdown() {
		// Giải phóng cache và Connection Pools.
		getSessionFactory().close();
	}

}